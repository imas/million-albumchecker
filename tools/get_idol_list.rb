require 'json'
require 'nokogiri'
require 'open-uri'

def idol_id(card_name)
  idol_list = JSON.load(File.read('../json/idol_list.json'))
  idol_id = -1
  idol_name = /\S+$/.match(card_name).to_s

  idol_list.each do |idol|
    if idol[1]["name"] == idol_name
      idol_id = idol[0]
      break
    end
  end

  idol_id.to_i
end

pointer = 1
card_list = []

# 1ページ目
html = Nokogiri::HTML(open('http://www50.atwiki.jp/imas_ml/pages/180.html'))
wiki_body = html.css('#wikibody').first
table_list = wiki_body.css('table')

table_list.each_with_index do |table, i|
  if i < 20 then
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

# 2ページ目
html = Nokogiri::HTML(open('http://www50.atwiki.jp/imas_ml/pages/181.html'))
wiki_body = html.css('#wikibody').first
table_list = wiki_body.css('table')

table_list.each_with_index do |table, i|
  if i < 18 then
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

json_card_list = JSON.pretty_generate(card_list)
File.write('../json/card_list.json', json_card_list)
File.write('../js/card_list_json.js', "var ___millimas_card_list =\n" + json_card_list + ";\n")
