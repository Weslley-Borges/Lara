from random import randint, choice
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.metrics import pairwise_distances
from nltk import word_tokenize, pos_tag, wordnet


def text_normalization(text):
  lema_words = []
  tokens = word_tokenize(text, language='portuguese')
  lema, tags_list = wordnet.WordNetLemmatizer(), pos_tag(tokens, tagset=None)
  
  for token, token_position in tags_list:
    if token_position.startswith('V'): pos_val = 'v'  # Verbo
    elif token_position.startswith('J'): pos_val = 'a'  # Ajetivo
    elif token_position.startswith('R'): pos_val = 'r'  # Advérbio
    else: pos_val = 'n'  # Noun

    lema_words.append(lema.lemmatize(token, pos_val))
  return " ".join(lema_words)


def get_response(message, cosine_similarity, dataframe):
  result = ['']
  
  if 0.75 < max(cosine_similarity):
    index = cosine_similarity.argmax()
    responses, pos_responses = dataframe["responses"].loc[index], dataframe["pos_responses"].loc[index]
    result = [choice(responses), choice(pos_responses)]

    # if pos_responses == [""]: result = [choice(responses)]
  return result


def get_best_context(contexts_array, message):
  message_contexts = []

  for contexts_object in contexts_array:
    for context in contexts_object['contexts']:
      message_contexts.append({
        "context": context,
        "responses": contexts_object['responses'],
        "pos_responses": contexts_object['pos_responses']
      })
  
  dataframe = pd.DataFrame(message_contexts)
  dataframe['lemmatized_text'] = dataframe['context'].apply(text_normalization)
  tfidf = TfidfVectorizer()
  dataframe_tfidf = pd.DataFrame(tfidf.fit_transform(dataframe['lemmatized_text']).toarray(), columns=tfidf.get_feature_names())

  lemmatized_text = text_normalization(str(message).lower())
  cosine_similarity = 1 - pairwise_distances(
		dataframe_tfidf,
		tfidf.transform([lemmatized_text]).toarray(),
		metric='cosine'
	)
  return get_response(message, cosine_similarity, dataframe)