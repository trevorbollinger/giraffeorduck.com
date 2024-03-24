import os
from PIL import Image

def convert_webp_to_jpg(file_path):
    im = Image.open(file_path).convert("RGB")
    jpg_file_path = os.path.splitext(file_path)[0] + ".jpg"
    im.save(jpg_file_path, "JPEG")
    return jpg_file_path

def main(folder_path, start_number=0):
    # Rename the folder to 'animals'
    new_folder_path = os.path.join(os.path.dirname(os.path.dirname(folder_path)), "animals")
    os.rename(folder_path, new_folder_path)
    folder_path = new_folder_path

    image_files = [f for f in os.listdir(folder_path) if os.path.isfile(os.path.join(folder_path, f))]
    image_files = [f for f in image_files if f.lower().endswith(('.jpg', '.webp'))]

    non_image_files = [f for f in os.listdir(folder_path) if os.path.isfile(os.path.join(folder_path, f)) and not f.lower().endswith(('.jpg', '.webp'))]
    for file in non_image_files:
        os.remove(os.path.join(folder_path, file))

    webp_files = [f for f in image_files if f.lower().endswith('.webp')]
    for idx, file in enumerate(webp_files):
        jpg_file_path = convert_webp_to_jpg(os.path.join(folder_path, file))
        os.remove(os.path.join(folder_path, file))
        os.rename(jpg_file_path, os.path.join(folder_path, f"image_{start_number + idx}.jpg"))

    # Rename remaining jpg files
    jpg_files = [f for f in image_files if f.lower().endswith('.jpg')]
    for idx, file in enumerate(jpg_files):
        os.rename(os.path.join(folder_path, file), os.path.join(folder_path, f"image_{start_number + len(webp_files) + idx}.jpg"))

if __name__ == "__main__":
    # folder_path = "/Users/trali/Desktop/images/princessibuprofen/Trolling"
    folder_path = "/mnt/c/Users/trali/Documents/GitHub/giraffeorduck.com/images/princessibuprofen/Trolling"
    start_number = 31*5  # Change this to whatever start number you desire
    main(folder_path, start_number)
