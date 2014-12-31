require 'yaml'
require 'json'
require 'nokogiri'
require 'open-uri'

def card_list_of(base_uri, page_id, table_num_limit, pointer)
  card_list = []
  html = Nokogiri::HTML(open("%s/%d.html"%[base_uri, page_id]))
  wiki_body = html.css('#wikibody').first
  table_list = wiki_body.css('table').slice(0..(table_num_limit.to_i - 1))

  card_list.concat(parse_wiki_page(table_list, pointer))
end

def parse_wiki_page(table_list, pointer)
  card_list = []
  table_list.each_with_index do |table, i|
    tr_list = table.children.css('tr')
    tr_list.each_with_index do |tr_elm, j|
      # wikiでは、6行ごとに空の行が入っているため
      # (見やすさのためと思われる)
      next unless (j % 6) != 0

      td_list = tr_elm.css('td')
      card = {
        "id" => pointer.to_s,
        "idol_id" => idol_id(td_list[2].inner_text),
        "idol_type" => td_list[1].inner_text,
        "rare" => td_list[0].inner_text,
        "name" => td_list[2].inner_text,
      }
      card_list.push(card)
      pointer = pointer + 1
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
      idol_id = idol["id"].to_i
      break
    end
  end

  idol_id
end

# main
config = YAML.load(File.read(File.expand_path('config.yml', File.dirname(__FILE__))))
page_list = config[:page_list]
base_uri = config[:base_uri]
all_card_list = []
pointer = 1

page_list.each do |page_info|
  all_card_list.concat(card_list_of(base_uri, page_info[:page_id], page_info[:table_num], pointer))
  pointer = all_card_list.length + 1
end

# js and json update
json_card_list = JSON.pretty_generate(all_card_list)
js_json_card_list = "var ___millimas_card_list =\n%s;\n"%[json_card_list]
File.write(File.expand_path('../json/card_list.json', File.dirname(__FILE__)), json_card_list)
File.write(File.expand_path('../js/card_list_json.js', File.dirname(__FILE__)), js_json_card_list)

# readme update
readme = File.read(File.expand_path('../README.md', File.dirname(__FILE__)))
readme.sub!(/『.+?』/, "『" + all_card_list.last['name'] + "』")
File.write(File.expand_path('../README.md', File.dirname(__FILE__)), readme)

exit if `git diff`.empty?
puts `git diff`
puts 'commit? (y/N):'
exit unless STDIN.gets.chomp == 'y'

# auto commit
base_dir = File.expand_path('../', File.dirname(__FILE__))
puts `#{base_dir}/tools/commit_update.sh #{base_dir} "#{all_card_list.last['name']}"`

# vim: sts=2 sw=2 ts=2
