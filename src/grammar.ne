@preprocessor typescript
@builtin "whitespace.ne"
@builtin "string.ne"
@builtin "number.ne"

module -> line:* {% d=> d[0] %}
       
line -> expression _ endblock _ {% d=> ["LINE", d[0] ]%}

endblock -> "::"

expression -> key_value_pair {% d => ["KEY_VALUE",d[0]] %} 
    | ignore_cell {% d=>d[0] %}
    | split_cell {% d=>d[0] %}
    | null {% d=>null%}

ignore_cell -> "ignore-cell" {% d => ["IGNORE_CELL"] %}

split_cell -> "---" {% d => ["SPLIT_CELL"] %} 
    | "---" "-":* {% d => ["SPLIT_CELL"] %}

key_value_pair -> key _ ":" _ value {% d => [d[0], d[4]] %}

value -> any_string {% d => ["STRING",d[0]] %} 
    | any_number {% d => ["NUMBER",d[0]] %} 
    | "true" {% d => ["BOOLEAN", true] %}
    | "false" {% d => ["BOOLEAN",false] %}
    | "null" {% d=> ["NULL",null]%}

any_number -> decimal {% d => d[0] %}

any_string -> dqstring {% d => d[0] %}
    | sqstring {% d => d[0] %}
    | btstring {% d => d[0] %}

key -> key_segment key_tail:* {% d => d.join("") %}
key_tail -> key_dot key_segment {% d => d.join("") %}
key_segment -> [a-zA-Z0-9_]:+ {% d => d[0].join("")%}
key_dot -> "."
