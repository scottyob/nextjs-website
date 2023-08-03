This is my web site.

## Setting up

You'll need a google app to make API requests to my spreadsheet data

Your .env.local file should look something like the following:

```
project_id=website-387103
private_key_id=
private_key=
client_email=
client_id=
```

## Downloading dynamic assets

Dynamic assets, such as Paragliding logbook flights from Google Sheets are cached and should be updated periodically (or when deploying the site).

To deploy this, you can use the *update-dynamic* script.

```
set -a
source .env.local
npm run update-dynamic
```

## TODO:
* Rock climbing page
* get page x/y working
* taxonomy
* RSS feed
* Look to add a heatmap [like this](https://cal-heatmap.com/docs/showcase)

### Issue with react-igc
I can't for the life of me figure out npm issues.  The packages are used to get components/react-igc to work that can be removed once @scottyob/react-igc works as expected.
- resium
- geolib
- fast-xml-parser
- @scottyob/react-igc (reinstall)
