import { HashLink } from 'react-router-hash-link';

import 'prismjs/themes/prism-solarizedlight.css';
import classes from '../../resources/css/pages/documentation.module.css';

import Prism from 'prismjs';
import { useEffect } from 'react';

import content from './content';
import Section from './Section';

import headerVideo from '../../resources/media/header.mp4';

function DocumentationTry() {

    useEffect(() => {
        Prism.highlightAll();
    },[]);

    return (
        <>
            <section className={`${classes.section} ${classes.introduction}`}>
                <h1>Documentation</h1>
                <p>
                    This documentation explains my thought process behind the scenes and
                    shows what I learned on the way.
                </p>
                <ul>
                    {content.map((section, index) => {
                        return (
                            <li key={`menu_${index}`}>
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
                        ^
                    </HashLink>
                </div>
            </section>
            {content.map((section, index) => {
                return <Section key={`section_${index}`} section={section}/>
            })}
        </>
    )
}

export default DocumentationTry;