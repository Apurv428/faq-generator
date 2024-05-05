import re
from groq import Groq
import os

client = Groq(
    api_key=os.environ.get("GROQ_API_KEY"),
)

def main(text):    
    contents = text
    if contents == -1:
        return -1
    index = 1  # Initialize index
    faqs = process_text(contents, index)
    return faqs

# function to chat with the groq api
def chat(prompt,questions=""):
    message_history = []
    
    if questions != "":
        
        message_history.append({"role": "assistant", "content": "Generated FAQ and their answers are :\n"})
        message_history.append({"role": "assistant", "content": questions})
    
    message_history.append({"role": "user", "content": prompt})
    
    response = client.chat.completions.create(
        model="mixtral-8x7b-32768",
        messages = message_history
    )
    return response


def process_text(text, index):
    faqs = []
    number_of_questions = 5
    prompt = (
        f"Generate {number_of_questions} frequently asked questions (FAQ) for the following content."        
        f"First, read the content and choose a question that you think users may ask frequently, consider the parts where users may struggle to understand the content and require assistance. Detect the most complex and complicated sections."
        f"Then, rewrite the question you've chosen first as a title and after writing the question as a title, under that title, provide the answer to the question."
        f"Afterwards, repeat the same process for all generated questions one by one, rewriting the question first then answering the question under the question."
        f"I want these question and answer paragraphs enumerated, starting from {index} to {index + number_of_questions - 1}"
        f"Questions must start with Q letter"
        f"For example:\n"
        f"Q{index}. How to write prompts?\n"
        f"In order to write prompts, you need to ....\n"
        f"{index + 4}. How to edit a written prompt?\n"
        f"Editing a prompt is easy, you need to.....\n"
        f"Content :\n{text}"
    )
    response = chat(prompt)
    faq = response.choices[0].message.content
    string_to_list(faq, faqs)
    return faqs

def string_to_list(faq,list):
    faq_items = faq.split("\n")

    for item in faq_items:
        if re.match(r'^Q\d', item):
            break
        faq_items.remove(item)
    
    for index in range(len(faq_items)):
        item = faq_items[index]
        temp = []
        
        if (not (item.isspace() or item == "")) and re.match(r'^Q\d', item):
            temp.append(item)
            answer = []
            
            while index < len(faq_items) - 1 and not re.match(r'^Q\d', faq_items[index + 1]):
                answer.append(faq_items[index + 1])
                index += 1
                
            answer = " ".join(answer)
            temp.append(answer)
            list.append(temp)
    
    return list
