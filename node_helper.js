const NodeHelper = require("node_helper");
const { exec } = require("child_process");
const { GoogleGenerativeAI, HarmCategory, HarmBlockThreshold} = require("@google/generative-ai");

module.exports = NodeHelper.create({
  start: function() {
    console.log("Starting helper: " + this.name);
  },

  socketNotificationReceived: function(notification, payload) {
    if (notification === "RUN_COMMAND") {
      this.apikey=payload.geminiApiKey;
      this.model=payload.model;
      this.runCommand();
    }
  },

  runCommand: function() {
    result=this.get_topic();
    title=result.title;
    topic=result.prompt.replace(/<country>/, this.get_country());

    const genAI = new GoogleGenerativeAI(this.apikey);
    const model = genAI.getGenerativeModel({
      model: this.model,
    });
    const generationConfig = {
      presencePenalty: 1.5,
      frequencyPenalty:1.5, 
      temperature: 2.0,
      topP: 1.0,
      topK: 40,
      maxOutputTokens: 500,
      responseMimeType: "text/plain",
    };
    const chatSession = model.startChat({
      generationConfig,
      history: [],
    });
    chatSession.sendMessage(topic).then((result) => {
      this.sendSocketNotification("COMMAND_OUTPUT", {
        title: title,
        text: result.response.text()
      });
    })
  },

  get_topic: function() {
    topics = [
            {title: "Did You Know?",
             prompt: "Tell me a fun fact in 50 words or less"},
            {title: "All About Animals",
             prompt: "Tell me an interesting fact about an animal in <country> in 50 words or less"},
            {title: "All About Countries",
             prompt: "Tell me an interesting fact about the country <country> in 50 words or less"},
            {title: "Famous People",
             prompt: "Tell me about a famous historical figure from <country> in 50 words or less"},
            {title: "Notable Events",
             prompt: "Tell me about a notable historical event that happened in <country> in 50 words or less"},
            {title: "Notable World Records",
             prompt: "Tell me about a notable world record in 50 words or less"},
            {title: "Sporting Events",
             prompt: "Tell me an interesting sporting event that happened in <country> in 50 words or less"},
            {title: "Odd, But True!",
             prompt: "Tell me an odd but true fact in 50 words or less"}
        ];
    const topicIndex = Math.floor(Math.random() * topics.length);
    return topics[topicIndex];
  },

  get_country: function() {
        countries = [
          "United States", "Afghanistan", "Albania", "Algeria", "American Samoa", "Andorra", "Angola", "Anguilla", "Antarctica",
          "Antigua And Barbuda", "Argentina", "Armenia", "Aruba", "Australia", "Austria", "Azerbaijan", "Bahamas", "Bahrain",
          "Bangladesh", "Barbados", "Belarus", "Belgium", "Belize", "Benin", "Bermuda", "Bhutan", "Bolivia", "Bosnia And Herzegowina",
          "Botswana", "Bouvet Island", "Brazil", "Brunei Darussalam", "Bulgaria", "Burkina Faso", "Burundi", "Cambodia", "Cameroon",
          "Canada", "Cape Verde", "Cayman Islands", "Central African Rep", "Chad", "Chile", "China", "Christmas Island", "Cocos Islands",
          "Colombia", "Comoros", "Congo", "Cook Islands", "Costa Rica", "Cote D`ivoire", "Croatia", "Cuba", "Cyprus", "Czech Republic",
          "Denmark", "Djibouti", "Dominica", "Dominican Republic", "East Timor", "Ecuador", "Egypt", "El Salvador", "Equatorial Guinea",
          "Eritrea", "Estonia", "Ethiopia", "Falkland Islands (Malvinas)", "Faroe Islands", "Fiji", "Finland", "France", "French Guiana",
          "French Polynesia", "French S. Territories", "Gabon", "Gambia", "Georgia", "Germany", "Ghana", "Gibraltar", "Greece", "Greenland",
          "Grenada", "Guadeloupe", "Guam", "Guatemala", "Guinea", "Guinea-bissau", "Guyana", "Haiti", "Honduras", "Hong Kong", "Hungary",
          "Iceland", "India", "Indonesia", "Iran", "Iraq", "Ireland", "Israel", "Italy", "Jamaica", "Japan", "Jordan", "Kazakhstan",
          "Kenya", "Kiribati", "Korea (North)", "Korea (South)", "Kuwait", "Kyrgyzstan", "Laos", "Latvia", "Lebanon", "Lesotho", "Liberia",
          "Libya", "Liechtenstein", "Lithuania", "Luxembourg", "Macau", "Macedonia", "Madagascar", "Malawi", "Malaysia", "Maldives", "Mali",
          "Malta", "Marshall Islands", "Martinique", "Mauritania", "Mauritius", "Mayotte", "Mexico", "Micronesia", "Moldova", "Monaco",
          "Mongolia", "Montserrat", "Morocco", "Mozambique", "Myanmar", "Namibia", "Nauru", "Nepal", "Netherlands", "Netherlands Antilles",
          "New Caledonia", "New Zealand", "Nicaragua", "Niger", "Nigeria", "Niue", "Norfolk Island", "Northern Mariana Islands", "Norway",
          "Oman", "Pakistan", "Palau", "Panama", "Papua New Guinea", "Paraguay", "Peru", "Philippines", "Pitcairn", "Poland", "Portugal",
          "Puerto Rico", "Qatar", "Reunion", "Romania", "Russian Federation", "Rwanda", "Saint Kitts And Nevis", "Saint Lucia",
          "St Vincent/Grenadines", "Samoa", "San Marino", "Sao Tome", "Saudi Arabia", "Senegal", "Seychelles", "Sierra Leone", "Singapore",
          "Slovakia", "Slovenia", "Solomon Islands", "Somalia", "South Africa", "Spain", "Sri Lanka", "St. Helena", "St.Pierre", "Sudan",
          "Suriname", "Swaziland", "Sweden", "Switzerland", "Syrian Arab Republic", "Taiwan", "Tajikistan", "Tanzania", "Thailand", "Togo",
          "Tokelau", "Tonga", "Trinidad And Tobago", "Tunisia", "Turkey", "Turkmenistan", "Tuvalu", "Uganda", "Ukraine", "United Arab Emirates",
          "United Kingdom", "Uruguay", "Uzbekistan", "Vanuatu", "Vatican City State", "Venezuela", "Viet Nam", "Virgin Islands (British)",
          "Virgin Islands (U.S.)", "Yemen", "Yugoslavia", "Zaire", "Zambia", "Zimbabwe"];
        const countryIndex = Math.floor(Math.random() * countries.length);
        return countries[countryIndex];
  },
});

