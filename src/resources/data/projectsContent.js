import promptGenerator from '../../resources/media/promptGenerator.mp4';
import poemify from '../../resources/media/poemify.mp4';
import cssSelfPortrait from '../../resources/media/cssSelfPortrait.mp4';

const projectsContent = [
    {   
        header: 'Prompt Generator',
        videoSrc: promptGenerator,
        altText: 'video shows functionality of the Prompt Generator',
        hoverText: 'Create your own personalized prompts.',
        navLink: 'prompt-generator',
    },
    {
        header: 'Poemify',
        videoSrc: poemify,
        altText: 'video shows functionality of Poemify',
        hoverText: 'Create your own poem by chosing words from a book excerpt.',
        navLink: 'poemify',
    },
    {
        header: 'CSS Self Portrait',
        videoSrc: cssSelfPortrait,
        altText: 'video shows self-portrait',
        hoverText: 'A little self-portrait',
        navLink: 'selfPortrait',
    }
];

export default projectsContent;