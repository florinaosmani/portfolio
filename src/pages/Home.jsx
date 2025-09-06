import { useEffect, useState } from "react";

import Project from "../components/projects/Project";

import classes from '../resources/css/pages/home.module.css';

import projectsContent from "../resources/data/projectsContent";

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
                        I started in electrical engineering at ETH for a year but I found it too theoretical.
                        Seeking a creative outlet, I started preparatory training at ZHdK,
                        but when it felt more like work than passion, I moved on.
                    </p>
                    <p>
                        I explored various jobs, took a make-up artistry course, and even studied psychology for a semester,
                        but nothing stuck until I discovered front-end development. It combines creativity, problem-solving,
                        and limitless learning, so there's always something new to discover!
                    </p>
                    <p>
                        Since I enjoyed JavaScript and the logic behind creating an app the most  out of everything I had learned, I decided I
                        needed to learn more about how different kinds of applications are developed. That's why I'm
                        currently attending Wiss Schulen für Wirtschaft Informatik Immobilien and getting an EFZ diploma
                        in application development. I look forward to gaining new skills and applying them in my professional journey,
                        and especially to having the experience to make all my ideas come to life.
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
                                    <i className="fa-brands fa-linkedin"></i>
                                </a>
                            </li>
                            <li>
                                <a href='https://github.com/florinaosmani' target='_blank'>
                                    <i className="fa-brands fa-github"></i>
                                </a>
                            </li>
                            <li>
                                <a href='mailto:florina.osmani@hotmail.com'>
                                    <i className="fa-solid fa-envelope"></i>
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
                        </ul>
                        <ul className={classes.rightList}>
                            <li>
                                React & Redux
                            </li>
                            <li>
                                Basics of Web Accessibility
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Home;