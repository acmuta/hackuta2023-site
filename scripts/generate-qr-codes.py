import qrcode
import os
from PIL import Image, ImageDraw, ImageFont

def generate_qr_code_with_text(data, filename, msd, hex_num):
    qr = qrcode.QRCode(
        version=1,
        error_correction=qrcode.constants.ERROR_CORRECT_L,
        box_size=10,
        border=4,
    )
    qr.add_data(data)
    qr.make(fit=True)
    img = qr.make_image(fill_color="black", back_color="white")
    
    # Add the encoded text to the image
    data_text = msd + hex_num
    draw = ImageDraw.Draw(img)
    draw.fontmode='1'
    font_path = "D:\Git_projects\hackuta2023-site-1\scripts\CONSOLAB.TTF"
    font = ImageFont.truetype(font_path, 16)  # You can use a different font if needed
    text = f'{data_text}'
    text_width, text_height = draw.textsize(text, font=font)
    x = (img.size[0] - text_width) // 2
    y = img.size[1] - text_height - 10
    draw.text((x, y), text, font=font, fill="black", )
    
    img.save(filename)

def main():
    output_directory = "qr_codes"
    if not os.path.exists(output_directory):
        os.makedirs(output_directory)

    for msd in ['A', 'B', 'C', 'D']:
        for lsd in range(0x7E):  # 0x7E = 126 in decimal
            hex_num = format(lsd, '02X')
            data = f'hackuta2023:{msd}{hex_num}'
            filename = os.path.join(output_directory, f'qr_{msd}_{hex_num}.png')
            generate_qr_code_with_text(data, filename, msd, hex_num)

if __name__ == "__main__":
    main()
