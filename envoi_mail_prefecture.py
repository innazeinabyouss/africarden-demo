import requests
from bs4 import BeautifulSoup

url = "https://www.vente-unique.com/s/a/cloturer-son-jardin-pour-pas-cher"
response = requests.get(url)
soup = BeautifulSoup(response.text, 'html.parser')

# Title
print("Title:", soup.title.string)

# Meta description
desc = soup.find('meta', attrs={'name': 'description'})
print("Meta Description:", desc['content'] if desc else "Non trouvée")

# H1
h1 = soup.find('h1')
print("H1:", h1.text.strip() if h1 else "Non trouvé")

# H2
h2s = soup.find_all('h2')
print("H2s:", [h2.text.strip() for h2 in h2s])

# Alt images
images = soup.find_all('img')
for img in images:
    print("Image src:", img.get('src'), "Alt:", img.get('alt'))

# Liens internes et externes
links = soup.find_all('a', href=True)
internal_links = [a['href'] for a in links if a['href'].startswith('/')]
external_links = [a['href'] for a in links if a['href'].startswith('http')]
print("Liens internes:", internal_links)
print("Liens externes:", external_links)

# Extraire tout le texte visible de la page
texts = soup.stripped_strings
full_text = ' '.join(texts)
print(full_text[:1000])  # Affiche un extrait

import nltk
from nltk.corpus import stopwords
from collections import Counter

nltk.download('punkt')
nltk.download('stopwords')
words = nltk.word_tokenize(full_text.lower())
filtered_words = [w for w in words if w.isalpha() and w not in stopwords.words('french')]
freq = Counter(filtered_words)
print(freq.most_common(20))
