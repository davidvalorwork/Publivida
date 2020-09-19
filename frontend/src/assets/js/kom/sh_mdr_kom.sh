#!/bin/bash

fname="sh_mdr_kom.sh" ;

if [ "$1" -eq 1 ]; then
	base_pro=$(dirname $(readlink -f "$fname"))"/web/hlm/adm/mod/$2/jsc/mdr/kom" ;
else
	base_pro=$(dirname $(readlink -f "$fname")) ;
fi

rm -rf $base_pro"/mdr_kom.jsp"

# echo "<%@page contentType=\"text/javascript\" %>" >> ./"mdr_kom.jsp"
echo "//<![CDATA[" >> $base_pro"/mdr_kom.jsp"
echo "/* ===================== $(date) ===================== */" >> $base_pro"/mdr_kom.jsp"
echo "" >> $base_pro"/mdr_kom.jsp"

for filename in $base_pro/*.js; do
	fn="${filename##*/}" ;
    echo "/* ------------------  $fn ------------------ */" >> $base_pro"/mdr_kom.jsp"
    cat "$filename" >> $base_pro"/mdr_kom.jsp"
    echo "<script type=\"text/javascript\" src=\"\${URLMod}/jsc/mdr/kom/$fn\"></script>"
done

echo "//]]>" >> $base_pro"/mdr_kom.jsp"

# remove CDATA
# sed -e 's/<!\[CDATA\[//g; s/\]\]>//g' ./"mdr_kom.jsp"

# compression
rm -rf $base_pro"/mdr_kom_min.js" ;
rm -rf $base_pro"/mdr_kom_yui.js" ;

# ----------------------
uglifyjs $base_pro"/mdr_kom.jsp" > $base_pro"/mdr_kom_min.jsp" ;

# ---------------------
yui-compressor --type js $base_pro"/mdr_kom.jsp" -o $base_pro"/mdr_kom_yui.jsp" ;

# insert
filetype="<%@page contentType=\"text/javascript\" %>"

sed -i '1s!^!<%@page contentType=\"text/javascript\" %>\n!' $base_pro"/mdr_kom.jsp" ;
sed -i '1s!^!<%@page contentType=\"text/javascript\" %>!' $base_pro"/mdr_kom_min.jsp" ;
sed -i '1s!^!<%@page contentType=\"text/javascript\" %>!' $base_pro"/mdr_kom_yui.jsp" ;

# remove 

