import { useEffect, useState } from "react";

import Project from "../components/projects/Project";

import classes from '../resources/css/pages/home.module.css';

import projectsContent from "../resources/data/projectsContent";

import github from "../resources/media/github-brands-solid-full.svg";
import linkedin from "../resources/media/linkedin-brands-solid-full.svg";
import email from "../resources/media/envelope-solid-full.svg";

function Home () {
    
    useEffect(()=>{
        window.scrollTo(0, 0);
    },[]);
    
   /* not needed right now for the little warning sign
    const [showIcon, setShowIcon] = useState(true);

    const toggleIcon = ()=>{
        setShowIcon(prev => !prev);
    };

    useEffect (()=>{
        const interval = setInterval(toggleIcon, 1000); 

        return () => {
            clearInterval(interval);
        }
    },[]) */


   /* makes lines same height as page......
   had to add width bcos it on mobile the scroll bar appearing and hiding would make it fire */
    const [height, setHeight] = useState(null);
    const [width, setWidth] = useState(null);

    useEffect(() => {
        /* timeout bcos first render can be wrong depending what hasnt loaded yet
        added event listener so when resize it changes */
        let sizeTimeout;

        const measure = () => {
            if (width !== document.body.clientWidth)
            {   setWidth(0);
                setHeight(0); /* temp solution cos jumps on rerender? */
                clearTimeout(sizeTimeout);
                sizeTimeout = setTimeout(() => {
                    const body = document.body;
                    const html = document.documentElement;
                    const height = Math.max(body.scrollHeight, body.offsetHeight,
                    html.clientHeight, html.scrollHeight, html.offsetHeight);
                    console.log(body.clientWidth)
                    setWidth(body.clientWidth);
                    setHeight(height);
            },100);
            }
        };

        measure();

        window.addEventListener('resize', measure);

        return () => {
            window.removeEventListener('resize', measure);
            clearTimeout(sizeTimeout);
        };
        
    }, []);


    return (
        <>
            <div className={classes.decoration}>
                <div className={`${classes.leftLine} ${classes.line}`}
                style={{ height: `${height}px`}}>
                </div>
                <div className={`${classes.rightLine} ${classes.line}`}
                style={{ height: `${height}px`}}>
                </div>
            </div>
            <div className={classes.home}>
                <div className={classes.inline}>
                        <p>Hi, I'm</p>
                        <h1>Florina Osmani!</h1>
                        {/* 
                        Not needed at the moment I think? little warning sign
                        <div className={classes.note}>
                            <i id='icon' className="fa-solid fa-triangle-exclamation" style={{ color: showIcon? 'black' : 'var(--blue-color)'}}></i>
                            <div className={classes.noteText}>
                                <p>This site is still under construction!</p>
                                <hr/>
                                <h3>Todos:</h3>
                                <ul>
                                    <li>
                                        Refactor, Refactor, refactor!
                                        Refactor, Refactor, refactor!
                                    </li>
                                    <li>
                                        Add comments 
                                        Add comments 
                                    </li>
                                    <li>
                                        fix accessibility 
                                    </li>
                                </ul>
                            </div>
                        </div> */}
                    </div>
                <div className={classes.introduction}>
                    <p>
                        My path to web development has been long but enlightening.
                        I started in electrical engineering at ETH for a year but I found it too theoretical and dry.  
                    </p>
                    <p>
                        I tried out a few other directions, but nothing really stuck until I discovered front-end development.
                        It felt like the perfect mix of creativity, problem-solving and logical thinking. Every day I got
                        to try something new and watch my ideas take shape.
                    </p>
                    <p>
                        Learning JavaScript opened up a whole world of possibilities that once felt out of reach.
                        I was amazed at how much I could build even with my limited knowledge and I couldn't stop imagining what I might
                        create if I learned more.
                    </p>
                    <p>
                        That's why I'm currently attending Wiss Schulen für Wirtschaft Informatik Immobilien and working toward my EFZ diploma
                        in application development. I can't wait to keep learning, become a strong contributor in a professional environment and
                        use what I learn to build the personal projects I've been dreaming about.
                    </p>
                </div>
                <div className={classes.projectsContainer}>
                    {projectsContent.map((project, index) => {
                        return (
                            <Project data={project} index={index}
                            key={index}/>
                        );
                    })}
                </div>
                <div className={classes.contact}>
                    <h2 className={classes.h2}>
                        Contact
                    </h2>
                    <hr className={classes.hr}/>
                    <p>
                        You can reach me at LinkedIn, check out my Github to see the code behind this page or send me an E-Mail!
                    </p>
                    <div className={classes.icons}>
                        <ul>
                            <li>
                                <a href='https://www.linkedin.com/in/florina-osmani-677b78262/' target='_blank'>
                                    <img src={linkedin} alt="Image of LinkedIn Icon" />
                                </a>
                            </li>
                            <li>
                                <a href='https://github.com/florinaosmani' target='_blank'>
                                    <img src={github} alt="Image of Github Icon"/>
                                </a>
                            </li>
                            <li>
                                <a href='mailto:florina.osmani@hotmail.com'>
                                    <img src={email} alt="Image of an envelope"/>
                                </a>
                            </li>
                        </ul>
                    </div>
                </div>
                <div className={classes.skills}>
                    <h2 className={classes.h2}>
                        Skills
                    </h2>
                    <hr className={classes.hr}/>
                    <div className={classes.skillsFlex}>
                        <ul className={classes.leftList}>
                            <li>
                                HTML & CSS
                            </li>
                            <li>
                                JavaScript
                            </li>
                            <li>
                                Java
                            </li>
                        </ul>
                        <ul className={classes.rightList}>
                            <li>
                                React & Redux
                            </li>
                            <li>
                                Basics of Web Accessibility
                            </li>
                            <li>
                                MySQL
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Home;