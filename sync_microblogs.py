#!/usr/bin/env python3

import os
import json
import boto3
from datetime import datetime

# S3 configuration
BUCKET_NAME = "duly-noted-data-afb957fc"
RAW_DATA_FOLDER_PATH = "raw-data"
PROCESSED_ITEMS_FOLDER_PATH = "processed-data"

# Setup S3 client
s3 = boto3.client('s3')

# Track new files added
new_files = []

def find_processed_items():
    """Find items with 'processed' status"""
    processed_items = []
    
    # List all JSON objects in the folder
    paginator = s3.get_paginator('list_objects_v2')
    page_iterator = paginator.paginate(Bucket=BUCKET_NAME, Prefix=RAW_DATA_FOLDER_PATH)
    
    for page in page_iterator:
        if 'Contents' not in page:
            continue
            
        for obj in page['Contents']:
            key = obj['Key']
            
            # Skip if not a JSON file
            if not key.endswith('.json'):
                continue
            
            # Get object metadata
            head_response = s3.head_object(Bucket=BUCKET_NAME, Key=key)
            metadata = head_response.get('Metadata', {})
            
            # Check if status is 'processed' its ready to go
            if metadata.get('status') == 'processed':
                # Strip off the extension from the S3 key
                processed_items.append(os.path.splitext(key)[0])

    return processed_items

def find_microblog_markdown(item_id):
    """Find markdown file with microblog target for a specific item"""
    prefix = f"{PROCESSED_ITEMS_FOLDER_PATH}/{item_id}"
    
    # List all objects in the item's folder
    paginator = s3.get_paginator('list_objects_v2')
    page_iterator = paginator.paginate(Bucket=BUCKET_NAME, Prefix=prefix)
    
    for page in page_iterator:
        if 'Contents' not in page:
            continue
            
        for obj in page['Contents']:
            key = obj['Key']
            
            # Skip if not a markdown file
            if not key.endswith('.md'):
                continue
            
            # Get object metadata
            head_response = s3.head_object(Bucket=BUCKET_NAME, Key=key)
            metadata = head_response.get('Metadata', {})
            
            # Check if target is 'microblog' and status is 'new'
            if metadata.get('target') == 'microblog' and metadata.get('status') == 'new':
                return key
    
    return None

def download_markdown(key, item_id):
    """Download markdown file and save to Hugo noted directory"""
    try:
        # Get the object
        response = s3.get_object(Bucket=BUCKET_NAME, Key=key)
        content = response['Body'].read().decode('utf-8')
        
        # Extract filename from key (use slug if possible, or generate from key)
        filename = os.path.basename(key)
        
        # Ensure the filename has a date prefix (YYYY-MM-DD-)
        if not filename[:10].replace('-', '').isdigit():
            today = datetime.now().strftime('%Y-%m-%d')
            filename = f"{today}-{filename}"
        
        # Save to Hugo noted directory
        destination = f"content/noted/{filename}"
        
        with open(destination, 'w') as file:
            file.write(content)
        
        print(f"Downloaded {key} to {destination}")
        return destination
    except Exception as e:
        print(f"Error downloading {key}: {e}")
        return None

def main():
    # Find processed items
    processed_items = find_processed_items()
    print(f"Found {len(processed_items)} processed items")
    
    # For each processed item, find and download microblog markdown
    for item_id in processed_items:
        print(f"Processing item {item_id}")
        
        # Find microblog markdown
        markdown_key = find_microblog_markdown(item_id.split('/')[-1])  # Extract the item ID from the path
        
        if markdown_key:
            # Download markdown
            destination = download_markdown(markdown_key, item_id)
            
            if destination:
                new_files.append(destination)
                
                # Mark as synced in S3 metadata for both markdown and original JSON
                try:
                    # Mark the original JSON as synced
                    s3.copy_object(
                        Bucket=BUCKET_NAME,
                        CopySource={'Bucket': BUCKET_NAME, 'Key': item_id + '.json'},
                        Key=item_id + '.json',
                        MetadataDirective='REPLACE',
                        Metadata={
                            'status': 'synced'
                        }
                    )
                    print(f"Marked {item_id}.json as synced in S3 metadata")
                except Exception as e:
                    print(f"Error marking {item_id}.json as synced: {e}")
                try:
                    s3.copy_object(
                        Bucket=BUCKET_NAME,
                        CopySource={'Bucket': BUCKET_NAME, 'Key': markdown_key},
                        Key=markdown_key,
                        MetadataDirective='REPLACE',
                        Metadata={
                            'target': 'microblog',
                            'status': 'published'
                        }
                    )
                    print(f"Marked {markdown_key} as published in S3 metadata")
                except Exception as e:
                    print(f"Error marking {markdown_key} as published: {e}")
    
    # Report results
    print(f"Downloaded {len(new_files)} new files")
    
    # Create output for GitHub Actions
    with open(os.environ['GITHUB_OUTPUT'], 'a') as f:
        f.write(f"new_files_count={len(new_files)}\n")
        if new_files:
            f.write(f"new_files={','.join(new_files)}\n")

if __name__ == "__main__":
    main()
