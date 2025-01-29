import { HashLink } from "react-router-hash-link";
import { Link } from 'react-router-dom';

import Project from "../components/projects/Project";

import classes from '../resources/css/pages/home.module.css';

import projectsContent from "../components/projects/projectsContent";

function Home () {
    return (
        <div className={classes.home}>
            <div className={classes.introduction}>
                <div className={classes.inline}>
                    <p>Hi, I'm</p>
                    <h1>Florina Osmani!</h1>
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
                        Right now, I'm deepening my React and Redux skills by building this portfolio and I am planning to explore
                        Tailwind or Bootstrap after. I then want to further my understanding in web accessibility,
                        and strengthen my knowledge in asynchronous functions before diving into TypeScript next!
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
                    <i class="fa-brands fa-html5"></i>
                    <i class="fa-brands fa-css3-alt"></i>
                    <i class="fa-brands fa-square-js"></i>
                    <i class="fa-brands fa-react"></i>
                </div>
            </div>
                <div>
                <h2 id='projects'>
                    Projects
                </h2>
                <div className={classes.projectsContainer}>
                    {projectsContent.map((project, index) => {
                        return (
                            <Project data={project} index={index}/>
                        );
                    })}
                </div>
            </div>
            <div className={classes.contact}>
                <h2 id='contact'>
                    Contact
                </h2>
                <p>
                    You can reach me at LinkedIn or check out my Github to see the code behind this page!
                </p>
                <div className={`${classes.icons} ${classes.bottom}`}>
                    <a href='www.linkedin.com/in/florina-osmani-677b78262' >
                        <i class="fa-brands fa-linkedin"></i>
                    </a>
                    <a href='https://github.com/florinaosmani'>
                        <i class="fa-brands fa-github"></i>
                    </a>
                </div>
            </div>
        </div>
    );
}

export default Home;