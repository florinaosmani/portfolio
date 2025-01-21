import { HashLink } from 'react-router-hash-link';

import 'prismjs/themes/prism-solarizedlight.css';
import classes from '../../resources/css/pages/documentation.module.css';

import Prism from 'prismjs';
import { useEffect } from 'react';

import headerVideo from '../../resources/media/header.mp4';

function Documentation () {

    useEffect(() => {
        Prism.highlightAll();
    }, []);

    return (
        <>
            <section className={`${classes.section} ${classes.introduction}`}>
                <h1 className={classes.h1}>Documentation</h1>
                <p>
                    I documented the process of creating this website in order to explain why
                    certain choices were made and what I learned while trying to create it.
                </p>
                <ol className={classes.ol} id='top'>
                    <li key='doc_1'>
                        <HashLink smooth to='#navbar' className={classes.a}>
                            Navigation Bar
                        </HashLink>
                    </li>
                    <li key='doc_2'>
                        <HashLink smooth to='#documentation' className={classes.a}>
                            Documentation
                        </HashLink>
                    </li>
                </ol>
                <div className={classes.scrollToTopContainer}>
                    <HashLink smooth to='#' className={`${classes.scrollToTop} ${classes.a}`} id='scroll-to-top' aria-label='go up'> 
                        {/* todo: please figure out how to make accessible and prettier*/}
                        ^
                    </HashLink>
                </div>
            </section>

            <section id='navbar' className={classes.section}>
                <h2>
                    Navigation Bar
                </h2>
                <p className={classes.p}>
                    This Navigation Bar was the first time I tried implementing Redux within my code.
                    It turned out easier than expected. I had some troubles implementing the scroll function, where the
                    navigation bar will shrink once the user scrolls.
                </p>
                <p className={classes.p}>
                    A quick Google Search will show, that scroll events will fire endlessly, once the user scrolls and
                    while it might not have made a big difference, I still wanted to challenge myself and see if I could
                    get it to fire only once.
                </p>
                <p className={classes.p}>
                    My search led me to debounce and throttle functions, which would limit the amount of times a function would run.
                    Yet even with those in place, the scroll events were firing over 20 times, which wasn't satisfactory.
                </p>
                <p className={classes.p}>
                    Instead I added a condition that would add an event listener only if the header is open, and a cleanup function
                    that would remove the event listener once.
                </p>
                
                <div className={classes.example}>
                    <pre>
                        <code className='language-javascript'>
                            {`
useEffect(()=>{
    const handleScroll = () => {
            dispatch(closeHeader());
            console.log("I'm scrolling");

    };

    if (isOpen) {
        window.addEventListener('scroll', handleScroll);
        console.log('I added an event listener')
    }

    return () => {
        if(isOpen) {
            window.removeEventListener('scroll', handleScroll);
            console.log('I removed an event listener');
        }
    };

},[isOpen]);
                            `}
                        </code>
                    </pre>
                    <video src={headerVideo} type='video/mp4' autoPlay loop muted id='header-video' className={headerVideo}
                        aria-label='A video showing the website the user is currently visiting on the left, and the Console
                                    on the right. While the user is scrolling two messages pop up on the console: "Im scrolling"
                                    and "I removed an event listener. Once the user clicks on the Navigation button another message
                                    pops up: "I added an event listener"'>
                        This video cannot be displayed.
                    </video>
                </div>
            </section>

            <section id='documentation' className={classes.section}>
                <h2>Documentation</h2>
                <p className={classes.p}>
                    Before starting this page, I really thought this was going to be easy and fast. As a beginner
                    I should have known that this would not be the case. 
                </p>
                <p className={classes.p}>
                    Not only did I have trouble linking within the page, since that apparently doesn't work within
                    the React Router, but I also had trouble figuring out how to format the code sections.
                </p>
                <p className={classes.p}>
                    Luckily the coding community provided simple solutions for me: HashLinks and Prism.js.
                </p>
                <p className={classes.p}>
                    At this point, with only two documentation sections, my code was getting long and hard to edit.
                    I kept wondering if I could create a component for my sections and keep the content within an object
                    in another file or if that would be too much considering the scope of this project...
                </p>
                <p className={classes.p}>
                    But since I'm doing this to challenge myself and learn, I thought it wouldn't hurt trying and making use
                    of git branch while I'm at it. This was exciting, because it was the first time I could use it within
                    one of my own projects and I really needed to see how it works in practice!
                </p>
            </section>
        </>
    )
}

export default Documentation;