import Projects from "../components/projects/Projects";

import classes from '../resources/css/pages/home.module.css';

function Home () {
    return (
        <>
            <div className={classes.introduction}>
                <h1>
                    Florina Osmani
                </h1>
                <p>
                    Yep. That's my name. I gotta think of something cool to say. Wow, what an
                    introduction! People will be so impressed by this. Cool, cool, cool. I'm not
                    sure what I actually should put here? This is the most boring part. I learn thing.
                    I do the thing? Now i weirdly enough enjoy the thing! Who would've thought! Not me.
                    But I do. It's puzzle-ing but to another level! Cool, yeah. This should be long enough.
                </p>
            </div>
            <Projects />
        </>
    );
}

export default Home;