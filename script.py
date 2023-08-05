import qrcode
import os

def generate_qr_code(data, filename):
    qr = qrcode.QRCode(
        version=1,
        error_correction=qrcode.constants.ERROR_CORRECT_L,
        box_size=10,
        border=4,
    )
    qr.add_data(data)
    qr.make(fit=True)
    img = qr.make_image(fill_color="black", back_color="white")
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
            generate_qr_code(data, filename)

if __name__ == "__main__":
    main()
