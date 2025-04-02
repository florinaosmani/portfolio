/* 
Basic Structure: 
content: [
  {
    id: 'lowercase id',
    header: 'actual h2 header',
    content:[
               {
                type: 'paragraph',
                data: `content`,
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
              {
                type: 'video-video',
                data: {
                  video1: {
                    src: src,
                    type: 'video/type',
                    className: 'className',
                    ariaLabel: 'ariaLabel',
                  },
                  video2: {
                    src: src,
                    type: 'video/type',
                    className: 'className',
                    ariaLabel: 'ariaLabel',
                  }
                }
              },
              {
                type: 'video',
                data: {
                  src: src,
                  type: 'video/type',
                  className: 'className',
                  ariaLabel: 'ariaLabel'
                }
              },
            ]
  }
];
*/

import poemify from '../media/poemify.mp4';
import poemMaker from '../media/poemMaker.mp4';
import poemifyMobile from '../media/poemifyMobile.mp4';

export const content = [
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
  {
    id: 'poemify',
    header: 'Poemify',
    content: [
      {
        type: 'paragraph',
        data: `I had already built this site before, but I wanted to improve it with Redux and make the functionality better.`
       },
       {
        type: 'video-video',
        data: {
          video1: {
            src: poemMaker,
            type: 'video/mp4',
            className: 'poemifyVidExample',
            ariaLabel: 'video showing the old website where you can create poems',
          },
          video2: {
            src: poemify,
            type: 'video/mp4',
            className: 'poemifyVidExample',
            ariaLabel: 'video showing the new website where you can create poems',
          }
        }
       },
       {
        type: 'paragraph',
        data: `One big challenge was CORS restrictions when fetching book text, so I set up a Netlify function to handle the request and return the necessary headers.`
       },
       {
        type: 'paragraph',
        data: `Extracting the right text was tricky since every file had different formatting. I started with four sample texts, filtering out unwanted elements through trial and error. I probably removed some valid paragraphs by accident, so I'm not super happy with this solution at the moment, but it was the simplest solution considering the vast differences between the texts formatting and my limited skills at the moment. (I will redo the whole project once I learn more and I know the next time I try it will be perfeeect!)`
       },
       {
        type: 'paragraph',
        data: `In my first version I had fetched text files and simply removed a bunch of character from the beginning and the end, but that would also lead to weird formatting whenever a new chapter would begin.`
       },
       {
        type: 'paragraph',
        data: `With fetching the HTML file I was hoping I could work around that by only removing the header tags but, even so the paragraphs sometimes contained different elements or stored a multitude of different texts, and with over a 100 books this is the best I could come up with at my current coding level. (Small shout-out to ChatGPT for helping me with the Regex, since all I can do on my own at this point is /<p>.*<\/p>/gs)`
       },
       {
        type: 'code',
        data: {
                language: 'language-js',
                code: `
const regex = /<p>[\s\S]*?<\/p>/g;
const bracketRegex = /<p\\b[^>]*>\s*\[[\s\S]*?\]\s*<\/p>/gs;
const pTags = book.match(regex);
const aTagRegex = /<a\\b[^>]*>[\s\S]*?<\/a>/gs;
const emptyTagRegex = /<p>\s*<\/p>/;

const text = pTags.filter(paragraph => {
        if (!paragraph.includes('<strong>')
            && !paragraph.includes('<i>')
            && !paragraph.includes('<br>')
            && !paragraph.includes ('<span')
            && !paragraph.includes ('<small>')
            && !paragraph.includes('<!--')
            && !paragraph.includes('This text is a combination of etexts,')
            && !paragraph.match(bracketRegex)
            && !paragraph.match(aTagRegex)
            && !paragraph.match(emptyTagRegex)) {
                return paragraph;
        }
    }).map(paragraph => {
        const noPTags = paragraph.slice(3,-4);
        const noPTagsTrim = noPTags.trim();
        return noPTagsTrim;
    })
    return text.join(' ');
};
                `,
              }
       },
       {
        type: 'paragraph',
        data: `In the first version, I wrapped every word in a <span> to make drag and drop work. This time, I wanted users to select words and see them highlighted by a border before dragging them into the poem field.`
       },
       {
        type: 'paragraph',
        data: `However, I wasn't able to implement this, since wrapping selected words in <span> elements made further selections impossible. The span elements were changing the indexes within my paragraph, and at this point I could't find a functional workaround.`
       },
       {
        type: 'paragraph',
        data: `Instead I created a third container: a separate <div> element that displays selected text rather than modifying the original content. Now I was able to check for duplicates since my indexes were dependent on the original text!`
       },
       {
        type: 'paragraph',
        data: `I really wanted the users to be able to select every character only once and had to figure out a way to do so. Although I knew I needed nested loops before starting, it still took a while (and a lot of console.logs) to make sure the logic was working as I had anticipated. Note: The following code has been altered for better styling within the browser.`
       },
       {
          type: 'code-code',
          data: {
            language1 : 'language-js',
            language2 : 'language-js',
            code1: `
let bool = false;
let removeIndex = [];
const newStartI = action.payload.startIndex;
const newEndI = action.payload.endIndex;

state.book.selections.forEach((selection, index) => {
    const selStartI = selection.startIndex;
    const selEndI = selection.endIndex;
    for(let i = selStartI; i < selEndI; i++) {
        for(let j = newStartI; j < newEndI; j++) {
            if(j === i) {
                bool = true;
                removeIndex.push(index);
                break;
            }
        }
        if(bool) {
            break;
        }
    }
});
            `,
            code2: `
const selections = state.book.selections;
if (bool) {
state.book.selections = selections((selection, index) => {
    return !removeIndex.some(i => i === index);
});
state.book.selections.push({
    content: action.payload.content,
    startIndex: action.payload.startIndex,
    endIndex: action.payload.endIndex,
});
} else {
  state.book.selections.push({
      content: action.payload.content,
      startIndex: action.payload.startIndex,
      endIndex: action.payload.endIndex,
  });
}
            `,
          }
       },
       {
        type: 'paragraph',
        data: `At this point, I started receiving performance warnings in my dev tools telling me that Redux was storing too much data. Originally, I kept the entire book's text in the store but I had to change it so my fetch function only stores the currently displayed section in its different lengths.`
       },
    ]
  },
  {
    id: 'poemifyMobile',
    header: 'Poemify Mobile Version',
    content: [
      {
        type: 'paragraph',
        data: `Initially I tested this page on an Iphone, where the drag and drop functionality was working. My phone broke while I was still testing which luckily made me test the page on an Android, where the drag and drop events weren't working.`,
       },
       {
        type: 'paragraph',
        data: `I ended up adding additional events for mobile, using touchStart, touchMove and touchEnd to change the elements position depending on the position of the touch event.`,
       },
       {
        type: 'paragraph',
        data: `Additionally I had to figure out a way to make the selections work better, since touchEnd doesn't seem to work well with text selections. Adding a button on every selectionChange did the job thankfully! I also ended up adding a scroll event that would let the button 'stay' in the right position, should the user scroll while selecting.`,
       },
       {
        type: 'paragraph',
        data: `Making the mobile-friendly version was a little tough, since every time I finished something, a new problem would show up! I had to create a long touch event and also a double tap event, since those weren't working reliably!`,
       },
       {
        type: 'paragraph',
        data: `In the end, this was all worth it! I love the mobile version even more than the desktop version. I even added a highlight on the selected words, which was super easy but seemed very hard only a few months ago! Progress! :)`,
       },
       {
        type: 'video',
        data: {
          src: poemifyMobile,
          type: 'video/mp4',
          className: 'poemifyMobile',
          ariaLabel: 'Shows the mobile version of the poemify page',
        }
      },
    ]
  },
  {
    id: 'selfportrait',
    header: 'CSS Self Portrait',
    content:[
               {
                type: 'paragraph',
                data: 'I wanted to try out CSS animations and experiment with different shapes in CSS. This was a quick project, but I feel like I learned a lot still.',
               },
               {
                type: 'paragraph',
                data: `Initially I only had one div with leaves inside, but I wanted to add more and then either copy and paste the CSS of the individual leaves and change the top positions so the leaves would keep looping, or find a workaround. I decided to work with JS since I didn't feel like copy pasting all of that and individually doing the calculations, so now I have two arrays containing "leaf-data".`,
               },
               {
                type: 'paragraph',
                data: 'One div has the positions of the leaves-containers, while the other has positions of individual leaves. Two map functions take care of creating the elements with their individual positions.',
               },
               {
                type: 'code',
                data: {
                        language: 'language-js',
                        code: `
{leavesOffset.map((leaves, index) => {
    return (
        <div 
        key={\`leaves_\${index}\`}
        className={classes.leaves}
        style={{top: \`\${leaves.top}%\`, left: \`\${leaves.left}%\`}}
        >
            {leafOffset.map(((leaf, i) => {
                const offset = leaves.top + leaf.top;
                return (
                    <>
                        <div 
                        className={classes.leaf}
                        style={{top: \`\${leaf.top}%\`, left: \`\${leaf.left}%\`}}
                        key={\`leafFirst_\${index}_\${i}\`}></div>
                        <div 
                        className={classes.leaf}
                        style={{top: \`calc(\${offset}% - 80vh)\`, left: \`\${leaf.left}%\`}}
                        key={\`leafLoop_\${index}_\${i}\`}></div>
                    </>
                )
            }))}
        </div>
                        `,
                      }
              },
               {
                type: 'paragraph',
                data: 'The rest of the styling was fun at some times and at other times reminded me why I think CSS is way more difficult than anything I could do in JavaScript! The hair gave me the most trouble, but even so was finished within an hour with help of a SVG Path Editor.',
               },
               {
                type: 'paragraph',
                data: `The leaves were the most enjoyable and rewarding part and I can't wait to come up with other ideas for CSS animation!`,
               },
            ]
  }
];

export default content;