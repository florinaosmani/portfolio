/* 
Basic Structure: 
content: [
  {
    id: 'lowercase id',
    header: 'actual h2 header',
    content:[
               {
                type: 'paragraph',
                data: 'content',
               },
              {
                type: 'code-video',
                data: {
                        language: 'language',
                        code: 'code',
                        video: {
                                  src: 'src',
                                  type: 'video/type',
                                  className: 'give className',
                                  ariaLabel: 'ariaLabel',
                                }
                      }, 
              },
              {
                type: 'code',
                data: {
                        language: 'language',
                        code: 'code',
                      }
              },
              {
                type: 'code-code',
                data: {
                  language1 : 'language-js',
                  language2 : 'language-js',
                  code1: ``,
                  code2: ``,
                }
              },
            ]
  }
];
*/

import headerVideo from '../../resources/media/header.mp4';

export const content = [
  {
    id: 'navbar',
    header: 'Navigation Bar',
    content: [
      {
        type: 'paragraph',
        data: `This Navigation Bar was the first time I tried implementing Redux within my code. It turned out easier than expected. I had some troubles implementing the scroll function, where the navigation bar will shrink once the user scrolls.`,
      },
      {
        type: 'paragraph',
        data: `A quick Google Search will show, that scroll events will fire endlessly, once the user scrolls and while it might not have made a big difference, I still wanted to challenge myself and see if I could get it to fire only once.`,
      },
      {
        type: 'paragraph',
        data: `My search led me to debounce and throttle functions, which would limit the amount of times a function would run. Yet even with those in place, the scroll events were firing over 20 times, which wasn't satisfactory.`,
      },
      {
        type: 'paragraph',
        data: `Instead I chose the simplest solution and added a condition that would add an event listener only if the header is open, and a cleanup function that would remove the event listener once.`,
      },
      {
        type: 'code-video',
        data: {
          language: 'language-js',
          code: `
  useEffect(() => {
    const handleScroll = () => {
      dispatch(closeHeader());
      console.log("I'm scrolling");
    };
  
    if (isOpen) {
      window.addEventListener('scroll', handleScroll);
      console.log('I added an event listener');
    }
  
    return () => {
      if (isOpen) {
        window.removeEventListener('scroll', handleScroll);
        console.log('I removed an event listener');
      }
    };
  }, [isOpen]);
            `,
          video: {
            src: headerVideo,
            type: 'video/mp4',
            className: 'headerVideo',
            ariaLabel: `A video showing the website the user is currently visiting on the left, and the Console on the right. While the user is scrolling two messages pop up on the console: "Im scrolling" and "I removed an event listener. Once the user clicks on the Navigation button another message pops up: "I added an event listener"`,
          },
        }
      },
    ],
  },
  {
    id: 'documentation',
    header: 'Documentation',
    content: [
      {
        type: 'paragraph',
        data: `Before starting this page, I really thought this was going to be easy and fast. As a beginner I should have known that this would not be the case.`,
      },
      {
        type: 'paragraph',
        data: `Not only did I have trouble linking within the page, but I also had trouble figuring out how to format the <code> sections.`,
      },
      {
        type: 'paragraph',
        data: `Luckily the coding community provided two simple solutions for me: HashLinks and Prism.js.`,
      },
      {
        type: 'paragraph',
        data: `At this point, with only two documentation sections, my code was getting long and hard to edit. I kept wondering if I could create a component for my sections and keep the content in another file or if that would be too much considering the scope of this project...`,
      },
      {
        type: 'paragraph',
        data: `But since I'm doing this to challenge myself and learn, I thought it wouldn't hurt trying and making use of git branch while I'm at it. This was exciting, because it was the first time I could use it within one of my own projects and I really needed to see how it works in practice!`,
      },
      {
        type: 'paragraph',
        data: `Figuring out how to format the data was a little complicated, but then incorporating it into the Section component turned out rather easy!`
      },
      {
        type: 'code',
        data: {
          language: 'language-js',
          code:  `
{data.content.map((item, index) => {
    switch(item.type) {
        case 'paragraph':
            return (
                <p className={classes.p} key={\`\${index}\`}>
                    {item.data}
                </p>
            );
        case 'code-video':
            return (
                <div className={classes.codeVideoExample}>
                // ...`,
        },
      },
    ],
  },
  {
    id: 'promptGenerator',
    header: 'Prompt Generator',
    content: [
      {
        type: 'paragraph',
        data: `I wanted to create a customizable prompt generator and needed an API to handle word requests. API-Ninjas was perfect, but it required a hidden API key.`
      },
      {
        type: 'paragraph',
        data: `At first, I considered storing it in a file that I would add to .gitignore, but I quickly found out that the user could still find it through the Dev Tools.`
      },
      {
        type: 'paragraph',
        data: `I learned I would need a backend, or a Netlify function, which is able to simulate one.`
      },
      {
        type: 'paragraph',
        data: `The setup seemed easy, until I spent hours debugging minor mistakes, like a capitalized folder name mismatch between my code and what I had commited or spending hours trying to log the API key instead of just checking my local server and seeing that it had in fact already been working.`
      },
      {
        type: 'paragraph',
        data: `In the end I am thankful to be making these mistakes now, because ever since then (especially the mistake of trying to log my API key, it's supposed to not be loggable...) I have been debugging using the Dev Tools, my code and the local server in tandem! Instead of fixating on one area, I try to work using all the tools available to me.`
      },
      {
        type: 'paragraph',
        data: `Here's the function running in the background!`
      },
      {
        type: 'code',
        data: {
          language: 'language-js',
          code: `
export const handler = async (event, context)  => {
  try {
      const apiKey = process.env.MY_KEY;
      const { type } = event.queryStringParameters;
      const url = \`https://api.api-ninjas.com/v1/randomword?type=\${type}\`;
      
      const response = await fetch(url, {
          headers: {
          'X-Api-Key': apiKey
      }});

      if (response.ok) {
          const jsonResponse = await response.json();
          return {
              statusCode: 200,
              body: JSON.stringify({
                  data: jsonResponse
              })};}

      return {
          statusCode: 500,
          body: JSON.stringify({
              message: 'Failed to fetch data!'
          })};

  } catch (error) {
      return {
          statusCode: 500,
          body: JSON.stringify({
              message: 'Something went wrong!',
              error: error.message
          })};}}               
                `
        },
      },
      {
        type: 'paragraph',
        data: `Another small challenge I had, was figuring out how to make all the words update "at the same time", or as close as possible!`
      },
      {
        type: 'paragraph',
        data: `For this I added another key-value pair to my initialState object, which would store the fetched words until they've all been retrieved before updating them all for the user to see!`
      },
      {
        type: 'code',
        data: {
          language: 'language-js',
          code: `
const handleFetchWord = async () => {
    const fetchWords = sentence.map(wordObj => {
        if (wordObj.type === 'fetchWord' && !wordObj.isLocked) {
            return dispatch(fetchWord({
                index: wordObj.keyId,
                type: wordObj.wordType.toLowerCase()
            }));
        }
    });
    Promise.all(fetchWords).then(()=>dispatch(updateAll()));
};          
          `
        }
      },
    ]
  },
];

export default content;