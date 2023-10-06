import random
import string
import qrcode
import os
from PIL import Image, ImageDraw, ImageFont


def generate_qr_code_with_text(data, filename, msd, hex_num):
    qr = qrcode.QRCode(
        version=1,
        error_correction=qrcode.constants.ERROR_CORRECT_L,
        box_size=16,
        border=2,
    )
    qr.add_data(data)
    qr.make(fit=True)
    img = qr.make_image(fill_color="black", back_color="white")

    # Add the encoded text to the image
    # data_text = msd + hex_num
    # draw = ImageDraw.Draw(img)
    # draw.fontmode = '1'
    # font_path = os.path.join(os.path.dirname(__file__), "CONSOLAB.TTF")
    # You can use a different font if needed
    # font = ImageFont.truetype(font_path, 16)
    # text = f'{data_text}'
    # text_width, text_height = draw.textsize(text, font=font)
    # x = (img.size[0] - text_width) // 2
    # y = img.size[1] - text_height - 10
    # draw.text((x, y), text, font=font, fill="black", )

    img.save(filename)


def main():
    output_directory = "qr_codes"
    if not os.path.exists(output_directory):
        os.makedirs(output_directory)

    # Using the code above as a reference, generate 600 total qr codes spread evently between groups "A", "B", "C", and "D", each with a randomized hexademical value. No two values should be the same. This hexadecimal value should be 6 characters total, with the first being A, B, C, or D, and the remaining 5 being the randomized hexademical value.
    for group_char in ['A', 'B', 'C', 'D']:
        hex_values = set()
        while len(hex_values) < 150:
            hex_value = ''.join(random.choices(string.hexdigits.upper(), k=5))
            if hex_value not in hex_values:
                hex_values.add(hex_value)
                data = f'https://hackuta.org/dashboard?id={group_char}{hex_value}'
                print(data)
                filename = os.path.join(
                    output_directory, f'qr-{group_char}{hex_value}.png')
                generate_qr_code_with_text(
                    data, filename, group_char, hex_value)


if __name__ == "__main__":
    main()
