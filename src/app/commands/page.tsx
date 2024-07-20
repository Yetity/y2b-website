"use client"

import React from 'react';
import s from './page.module.css';
import commands from './commands';
import type {Command, Subcommand} from './commands'

const searchFor = () => {
    const input = document.getElementById("search") as HTMLInputElement;
    const targetId = input.value.trim().toLowerCase();
    const targetElement = document.getElementById(targetId);

    if (targetElement) {
        targetElement.scrollIntoView({ behavior: "smooth" });
    }
};

const CommandComponent = ({ c }: { c: Command }) => (
    <div id={c.name.toLowerCase()} className={s.command}>
        <div className={s.commandHead}>
            <div className={s.commandName}>{c.name}</div>
            <div className={s.commandUse}>{c.use || ""}</div>
        </div>
        <div className={s.commandDesc}>
            {c.description}
            {/* Render subcommands only if it is defined and not empty */}
            {c.subcommands && c.subcommands.length > 0 && (
                <div className={s.subcommands}>
                    {c.subcommands.map((sub: Subcommand, index) => (
                        <div key={index} className={s.subcommand} id={c.name.toLowerCase() + " " + sub.name.toLowerCase()}>
                            <div className={s.subcommandHead}>
                                <div className={s.subcommandName}>{sub.name}</div>
                                <div className={s.subcommandUse}>{sub.use}</div>
                            </div>
                            <div className={s.subcommandDesc}>{sub.description}</div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    </div>
);

const Commands = () => {
    return (
        <main className={s.main}>
            <h1 className={s.h1}>Commands</h1>
            <div className={s.searchBar}>
                <input
                    type="text"
                    id="search"
                    className={s.searchBar}
                    placeholder="Enter command name"
                />
                <button onClick={() => searchFor()} className={s.button}>Go!</button>
            </div>
            <div className={s.howTo}>[] = required, () = optional</div>
            <div className={s.commands}>
                {commands.map((cmd, index) => (
                    <CommandComponent
                        key={index}
                        c={cmd}
                    />
                ))}
            </div>
            <footer>
                <div className={s.copyright}>
                    &copy;2023 Yet 2.0 Bot. All rights reserved.
                </div>
            </footer>
        </main>
    );
};

export default Commands;