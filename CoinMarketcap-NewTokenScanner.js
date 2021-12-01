
let todayTokens = []
let firstTimeRun = true;
const apiKey = '16ca912c-2ded-4fb3-8c54-c2701ad6383e'
// get you free api key here
// https://coinmarketcap.com/api/
//----------------------MAIN FUNCTION----------------------------------------------------------------------------------------
const TokenScanner = async () => {
  const expectedDate = '12/1/2021';
  const response = await fetch('https://pro-api.coinmarketcap.com/v1/cryptocurrency/listings/latest?start=1&limit=5000&convert=USD', {
    method: 'GET',
    headers: {
	  'X-CMC_PRO_API_KEY': apiKey
    }
  });
  
  const responseObject = await response.json();
  
  for (const [key, value] of Object.entries(responseObject)) {
	const tokenList = responseObject[key];
	if(tokenList){
		for(const [k, v] of Object.entries(tokenList)){
			//console.log(tokenList[k])
			if(tokenList[k]){
				//console.log(new Date(tokenList[k].date_added).valueOf())
				//console.log(new Date(expectedDate).valueOf())
				//console.log(tokenList[k].date_added)
				let localDateString = new Date(tokenList[k].date_added).toLocaleDateString();
				
				if(new Date(localDateString).valueOf() == new Date(expectedDate).valueOf()){
					if(firstTimeRun){
						todayTokens.push(tokenList[k].name)
					} else {
						console.log(!todayTokens.includes(tokenList[k].name))
						if(!todayTokens.includes(tokenList[k].name)){
							todayTokens.push(tokenList[k].name);
							console.log("New added = " + tokenList[k].name)
							// music will play to let you know a new token being added to the list on the coinmarketcap
							let letsMusic = new Audio('https://www.soundhelix.com/examples/mp3/SoundHelix-Song-4.mp3');
							letsMusic.play();
						}
					}
				}
			}
		}
		
	}
  }
  console.log("update first time run to false");
  firstTimeRun = false;
  console.log("Done");

  setTimeout(function() {
	TokenScanner();
  }, 300000);
  
};

TokenScanner();

//----------------------END FUNCTION----------------------------------------------------------------------------------------
