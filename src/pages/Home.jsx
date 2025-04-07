import { HashLink } from "react-router-hash-link";
import { useEffect, useState } from "react";

import Project from "../components/projects/Project";

import classes from '../resources/css/pages/home.module.css';

import projectsContent from "../resources/data/projectsContent";

function Home () {
    const [showIcon, setShowIcon] = useState(true);

    const toggleIcon = ()=>{
        setShowIcon(prev => !prev);
    };

    useEffect (()=>{
        const interval = setInterval(toggleIcon, 1000); 

        return () => {
            clearInterval(interval);
        }
    },[])

    return (
        <div className={classes.home}>
            <div className={classes.introduction}>
                <div className={classes.inline}>
                    <p>Hi, I'm</p>
                    <h1>Florina Osmani!</h1>
                    {/* 
                    Not needed at the moment I think?
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
                <div className='text_introduction'>
                    <p>
                        My path to web development has been long but enlightening.
                        I started in electrical engineering at ETH for a year but found it too theoretical.
                        Seeking a creative outlet, I started preparatory training at ZHdK,
                        but when it felt more like work than passion, I moved on.
                    </p>
                    <p>
                        I explored various jobs, took a make-up artistry course, and even studied psychology for a semester,
                        but nothing stuck until I discovered front-end development. It combines creativity, problem-solving,
                        and limitless learning, so there's always something new to discover!
                    </p>
                    <p>
                        Right now, I'm doing the&nbsp;
                        <a href='https://www.edx.org/learn/web-accessibility/the-world-wide-web-consortium-w3c-introduction-to-web-accessibility'
                         target='_blank'>
                            "W3Cx: Introduction to Web Accessibility"
                        </a>
                        &nbsp;course on edx.org!
                    </p>
                    <p>
                        Check out my&nbsp;
                        <HashLink 
                        smooth
                        to='#projects'>
                            Projects
                        </HashLink>
                        &nbsp;so far or go to my&nbsp;
                        <HashLink
                        smooth
                        to='#contact'>
                            Contact
                        </HashLink>
                        &nbsp;info to reach out!
                    </p>
                </div>
                <div className={classes.icons}>
                    <i className="fa-brands fa-html5"></i>
                    <i className="fa-brands fa-css3-alt"></i>
                    <i className="fa-brands fa-square-js"></i>
                    <i className="fa-brands fa-react"></i>
                </div>
            </div>
                <div>
                <h2 id='projects' className={classes.h2}>
                    Projects
                </h2>
                <div className={classes.projectsContainer}>
                    {projectsContent.map((project, index) => {
                        return (
                            <Project data={project} index={index}
                            key={index}/>
                        );
                    })}
                </div>
            </div>
            <div className={classes.contact}>
                <h2 id='contact' className={classes.h2}>
                    Contact
                </h2>
                <p>
                    You can reach me at LinkedIn, check out my Github to see the code behind this page or send me an E-Mail!
                </p>
                <div className={`${classes.icons} ${classes.bottom}`}>
                    <a href='https://www.linkedin.com/in/florina-osmani-677b78262/' target='_blank'>
                        <i className="fa-brands fa-linkedin"></i>
                    </a>
                    <a href='https://github.com/florinaosmani' target='_blank'>
                        <i className="fa-brands fa-github"></i>
                    </a>
                    <a href='mailto:florina.osmani@hotmail.com'>
                        <i className="fa-solid fa-envelope"></i>
                    </a>
                </div>
            </div>
        </div>
    );
}

export default Home;