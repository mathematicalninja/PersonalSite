import bs4
import json
from pkmnAPI import getPkmnDexLocalHtmlPath

def mewTestSoup():
    path = getPkmnDexLocalHtmlPath(151, 6)
    with open(path, 'r', encoding="utf-8") as f:
        soup = bs4.BeautifulSoup(f.read(), "html.parser")
    return soup

def extract_element(element):
    if element.name == 'table':
        return parse_table(element)
    elif element.name == 'tr':
        return [extract_element(td) for td in element.find_all(['td', 'th'])]
    elif element.name in ['td', 'th']:
        children = list(element.children)
        if len(children) == 1 and children[0].name is None:
            return element.get_text(separator=" ", strip=True)
        else:
            return [extract_element(child) for child in children if child.name or child.strip()]
    else:
        return element.get_text(separator=" ", strip=True)

def parse_table(table):
    data = []
    rows = table.find_all('tr')
    for row in rows:
        data.append(extract_element(row))
    return data

if __name__ == "__main__":
    tables = mewTestSoup().find_all('table', class_='dextable')
    
    all_tables_data = {}
    for index, table in enumerate(tables):
        table_data = parse_table(table)
        all_tables_data[f"Table {index + 1}"] = table_data

    # Save to JSON file
    with open('tables_data.json', 'w', encoding='utf-8') as json_file:
        json.dump(all_tables_data, json_file, ensure_ascii=False, indent=4)

    print("Data saved to tables_data.json")


# TODO: create recursive structure in return, so "flat" tables are not returned 
# BUG: some tables are being returned recursivly multiple times in multiple layesr