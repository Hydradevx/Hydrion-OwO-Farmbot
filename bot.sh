read -p "token" token
read -p "prefix" prefix

cat <<EOF > settings.json
{
 "main_token": "$token",
 "prefix": "$prefix"
}