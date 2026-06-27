# Seeding script for HA9I database
from lawyers.models import Lawyer
from resources.models import LegalResource
from django.contrib.auth import get_user_model

User = get_user_model()

print("----- SEEDING HA9I DATABASE -----")

# 1. Create default lawyers
lawyers_data = [
    {
        "name": "أ. محمد بن أحمد (Mouloud Benahmed)",
        "specialization": "family",
        "wilaya": "Alger",
        "address": "شارع ديدوش مراد، الجزائر الوسطى، الجزائر العاصمة",
        "phone": "021734567",
        "latitude": 36.7642,
        "longitude": 3.0588,
    },
    {
        "name": "أ. سميرة بلقاسم (Samira Belkacem)",
        "specialization": "criminal",
        "wilaya": "Oran",
        "address": "نهج جيش التحرير الوطني، وهران",
        "phone": "041401234",
        "latitude": 35.6971,
        "longitude": -0.6308,
    },
    {
        "name": "أ. كمال حداد (Kamel Haddad)",
        "specialization": "civil",
        "wilaya": "Constantine",
        "address": "حي قدور بومدوس، قسنطينة",
        "phone": "031925678",
        "latitude": 36.3650,
        "longitude": 6.6147,
    },
    {
        "name": "أ. فريدة منصور (Farida Mansour)",
        "specialization": "labor",
        "wilaya": "Alger",
        "address": "شارع حسيبة بن بوعلي، سيدي امحمد، الجزائر",
        "phone": "021654321",
        "latitude": 36.7538,
        "longitude": 3.0612,
    }
]

for l in lawyers_data:
    lawyer, created = Lawyer.objects.get_or_create(
        name=l["name"],
        defaults=l
    )
    if created:
        print(f"Created Lawyer: {l['name']}")

# 2. Create default legal resources
docs_data = [
    {
        "title": "القانون المدني الجزائري (الأمر رقم 75-58)",
        "category": "civil",
        "published_date": "1975-09-26",
        "summary": "يتضمن القواعد القانونية الأساسية للعقود، الملكية، الالتزامات والمسؤولية التقصيرية في القانون الجزائري.",
        "pdf_url": "https://www.joradp.dz/FTP/JO-ARABE/1975/A1975078.pdf"
    },
    {
        "title": "قانون العقوبات الجزائري (الأمر رقم 66-156)",
        "category": "criminal",
        "published_date": "1966-06-08",
        "summary": "يحدد الجرائم والمخالفات المرتكبة والعقوبات المقررة لها والتدابير الأمنية المطبقة في الجزائر.",
        "pdf_url": "https://www.joradp.dz/FTP/JO-ARABE/1966/A1966049.pdf"
    },
    {
        "title": "قانون الأسرة الجزائري (القانون رقم 84-11)",
        "category": "family",
        "published_date": "1984-06-09",
        "summary": "ينظم أحكام الزواج، انحلال الميثاق الزوجي، الولاية، الحضانة، الميراث والنفقة.",
        "pdf_url": "https://www.joradp.dz/FTP/JO-ARABE/1984/A1984024.pdf"
    },
    {
        "title": "دستور الجمهورية الجزائرية الديمقراطية الشعبية",
        "category": "constitution",
        "published_date": "2020-12-30",
        "summary": "القانون الأسمى للدولة الذي يحدد شكل الحكم والحقوق الأساسية والحريات الفردية والجماعية.",
        "pdf_url": "https://www.joradp.dz/FTP/JO-ARABE/2020/A2020082.pdf"
    }
]

for d in docs_data:
    doc, created = LegalResource.objects.get_or_create(
        title=d["title"],
        defaults=d
    )
    if created:
        print(f"Created Document: {d['title']}")

# 3. Create a default Citizen user for immediate local login
user_email = "citizen@mail.dz"
if not User.objects.filter(email=user_email).exists():
    User.objects.create_user(
        email=user_email,
        password="password123",
        first_name="Youcef",
        last_name="Benali",
        national_id="102938475610293847"
    )
    print(f"Created default citizen user: {user_email} (password: password123)")

# 4. Create an admin user for MOJ status review access
admin_email = "admin@ha9i.gov.dz"
if not User.objects.filter(email=admin_email).exists():
    User.objects.create_superuser(
        email=admin_email,
        password="adminpassword"
    )
    print(f"Created admin staff user: {admin_email} (password: adminpassword)")

print("---------------------------------")
