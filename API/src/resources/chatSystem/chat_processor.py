import pandas as pd
import wikipediaapi
from random import randint
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.metrics import pairwise_distances
from nltk import word_tokenize, pos_tag, wordnet


class ChatProcessor:
	def __init__(self):
		from src.server.instance import server
		self.dataframe = pd.DataFrame(server.database["message_contexts"].find())

		# Executa todo o processo de normalização dos contextos
		self.dataframe['lemmatized_text'] = self.dataframe['context'].apply(self.text_normalization)
		self.tfidf = TfidfVectorizer()
		self.dataframe_tfidf = pd.DataFrame(
			self.tfidf.fit_transform(self.dataframe['lemmatized_text']).toarray(),
			columns=self.tfidf.get_feature_names()
		)
	
	def text_normalization(self, text):
		lema_words = []
		tokens = word_tokenize(text, language='portuguese')
		lema, tags_list = wordnet.WordNetLemmatizer(), pos_tag(tokens, tagset=None)
		
		for token, token_position in tags_list:
			if token_position.startswith('V'):
				pos_val = 'v'  # Verbo
			elif token_position.startswith('J'):
				pos_val = 'a'  # Ajetivo
			elif token_position.startswith('R'):
				pos_val = 'r'  # Advérbio
			else:
				pos_val = 'n'  # Noun
			
			lema_words.append(lema.lemmatize(token, pos_val))
		return " ".join(lema_words)

	def chat_tfidf(self, text):
		# Faz o tratamento da mensagem e analisa a compatibilidade com os presets
		lemmatized_text = self.text_normalization(str(text).lower())
		cosine_similarity = 1 - pairwise_distances(
			self.dataframe_tfidf,
			self.tfidf.transform([lemmatized_text]).toarray(),
			metric='cosine'
		)
		
		result = ['']
		if 0.75 < max(cosine_similarity):
			index = cosine_similarity.argmax()
			responses, pos_responses = self.dataframe["responses"].loc[index], self.dataframe["pos_responses"].loc[index]
			
			if pos_responses == [""]:
				result = [responses[randint(0, len(responses)-1)]]
			else:
				result = [responses[randint(0, len(responses)-1)], pos_responses[randint(0, len(pos_responses)-1)]]
		
		elif "fale sobre" in str(text).lower():
			text, wiki = str(text).lower().replace("fale sobre", ""), wikipediaapi.Wikipedia('pt')
			page = wiki.page(text)
			
			if page.exists():
				result = [wiki.extracts(page, exsentences=4)]
			else:
				dont_care = ["Sei lá o que é isso", "Não sei de nada", "Nunca nem vi"]
				result = [dont_care[randint(0, len(dont_care)-1)]]
		return result


chat_processor = ChatProcessor()