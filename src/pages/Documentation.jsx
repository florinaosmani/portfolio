import { HashLink } from 'react-router-hash-link';

import 'prismjs/themes/prism-solarizedlight.css';
import classes from '../resources/css/pages/documentation.module.css';

import Prism from 'prismjs';
import { useEffect, useState } from 'react';

import content from '../resources/data/documentationContent';
import Section from '../components/documentation/Section';

function Documentation() {

    useEffect(()=>{
        window.scrollTo(0, 0);
      },[]);

    useEffect(() => {
        Prism.highlightAll();
    },[]);

    /* makes lines same height as page...... */
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
            <div className={classes.documentation}>
                <section className={`${classes.section} ${classes.introduction}`}>
                    <h1>Documentation</h1>
                    <p>
                        This documentation explains my thought process behind the scenes and
                        shows what I learned on the way.
                    </p>
                    <ul>
                        {content.map((section, index) => {
                            return (
                                <li key={`menu_${index}`}
                                className={classes.listItem}>
                                    <HashLink
                                        smooth
                                        to={`#${section.id}`}>
                                            {section.header}
                                    </HashLink>
                                </li>
                            );
                        })}
                    </ul>
                    <div className={classes.scrollToTopContainer}>
                        <HashLink 
                            smooth 
                            to='#' 
                            className={classes.scrollToTop}
                            aria-label='a link that will take you to the top of the page'> 
                            {/* todo: please figure out how to make accessible and prettier*/}
                            <i className="fa-solid fa-arrow-up"></i>
                        </HashLink>
                    </div>
                </section>
                {content.map((section, index) => {
                    return <Section key={`section_${index}`} section={section}/>
                })}
            </div>
        </>
    )
}

export default Documentation;