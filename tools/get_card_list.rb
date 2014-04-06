require 'json'
require 'nokogiri'
require 'open-uri'

page_list = {206 => 10, 205 => 10, 204 => 10, 203 => 10, 208 => 2}

def card_list_of(page, limit, pointer)
  card_list = []

  html = Nokogiri::HTML(open("http://www50.atwiki.jp/imas_ml/pages/" + page.to_s + ".html"))
  wiki_body = html.css('#wikibody').first
  table_list = wiki_body.css('table')

  table_list.each_with_index do |table, i|
    if i < limit then
      tr_list = table.children
      tr_list.each_with_index do |tr_elm, j|
        if (j % 6) != 0 then
          td_list = tr_elm.css('td')

          card = { "id" => pointer.to_s, "idol_id" => idol_id(td_list[2].inner_text), "idol_type" => td_list[1].inner_text, "rare" => td_list[0].inner_text, "name" => td_list[2].inner_text }
          card_list.push(card)
          pointer = pointer+1
        end
      end
    end
  end

  card_list
end

def idol_id(card_name)
  idol_list = JSON.load(File.read(File.expand_path('../json/idol_list.json', File.dirname(__FILE__))))
  idol_id = -1
  idol_name = /\S+$/.match(card_name).to_s

  idol_list.each do |idol|
    if idol_name == idol["name"]
      idol_id = idol["id"]
      break
    end
  end

  idol_id.to_i
end

all_card_list = []
pointer = 1
page_list.each do |page_info|
  all_card_list.concat(card_list_of(page_info[0], page_info[1], pointer))
  pointer = all_card_list.length + 1
end

json_card_list = JSON.pretty_generate(all_card_list)
File.write(File.expand_path('../json/card_list.json', File.dirname(__FILE__)), json_card_list)
File.write(File.expand_path('../js/card_list_json.js', File.dirname(__FILE__)), "var ___millimas_card_list =\n" + json_card_list + ";\n")
