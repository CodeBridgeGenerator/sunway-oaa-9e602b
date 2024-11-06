import React, { useState, useRef } from 'react';
import { InputText } from 'primereact/inputtext';
import { Dialog } from 'primereact/dialog';
import CourseRegistration from './ColoredPills';

const CommandCentre = () => {
    const [visible5, setVisible5] = useState(false);
    const [value5, setValue5] = useState('Search menus, shortcuts, contact and more...');
    const input5 = useRef(null);

    return (
        <>
            <section
                className="w-30rem bg-black-alpha-50 border-round-lg"
                style={{ backdropFilter: 'blur(70px)' }}
                onClick={() => {
                    setVisible5(true);
                    setValue5('');
                }}
            >
                <div className="flex w-full align-items-center justify-content-between px-1">
                    <span className="p-input-icon-left w-full">
                        <i className="pi pi-search text-white-alpha-80"></i>
                        <InputText
                            type="text"
                            value={value5}
                            className="w-full border-none bg-transparent shadow-none outline-none text-white-alpha-80 text-sm"
                            onClick={() => {
                                setVisible5(true);
                                setValue5('');
                            }}
                        />
                    </span>
                    <span className="p-1 border-white-alpha-20 border-1 border-round mr-2 text-white-alpha-80 text-xs bg-white-alpha-2s hidden md:block">⌘K</span>
                </div>
            </section>

            <Dialog
                visible={visible5}
                onHide={() => {
                    setVisible5(false);
                    setValue5('Search menus, shortcuts, contact and more...');
                }}
                onShow={() => input5.current.focus()}
                modal
                dismissableMask
                showHeader={false}
                className="border-none bg-black-alpha-50"
                contentClassName="border-black-alpha-20 border-round p-0 bg-transparent"
                breakpoints={{ '960px': '75vw', '640px': '100vw' }}
                style={{ width: '620px', backdropFilter: 'blur(70px)' }}
            >
                <div className="flex w-full align-items-center justify-content-between px-1">
                    <span className="p-input-icon-left w-full">
                        <i className="pi pi-search text-white-alpha-80"></i>
                        <InputText
                            type="text"
                            ref={input5}
                            value={value5}
                            onChange={(e) => setValue5(e.target.value)}
                            className="w-full border-none bg-transparent shadow-none outline-none text-white-alpha-80 text-sm"
                        />
                    </span>
                    <span className="p-1 border-white-alpha-20 border-1 border-round mr-2 text-white-alpha-80 text-xs bg-white-alpha-20 hidden md:block">⌘K</span>
                </div>

                <div className="border-y-2 border-white-alpha-20 p-3">
                    <h2 className="font-semibold text-xs text-white-alpha-50 mb-2 mt-0 px-1">RECENT</h2>
                    <ul className="list-none m-0 p-0">
                        {['unread mails', 'go to last mail', 'lock account', 'profile'].map((item) => (
                            <li key={item} className="select-none p-2 text-white-alpha-80 font-normal text-base cursor-pointer border-round-lg hover:bg-white-alpha-20 hover:text-white">
                                {item}
                            </li>
                        ))}
                    </ul>
                </div>

                <div className="p-3">
                    {[
                        { icon: 'pi-star', label: 'Favorites', description: 'Reach your favorites easily' },
                        { icon: 'pi-github', label: 'Repositories', description: 'Get list and manage your repositories' },
                        { icon: 'pi-bolt', label: 'Upgrade your plan now', description: 'Access all premium benefits' },
                        { icon: 'pi-sync', label: 'Resync your account', description: 'Refresh all of your data' }
                    ].map((item, index) => (
                        <article key={index} className="flex flex-column sm:flex-row w-full sm:justify-content-between sm:align-items-center mb-3 select-none cursor-pointer border-round-lg px-2 py-1 text-white-alpha-80 hover:bg-white-alpha-20 hover:text-white">
                            <div className="flex align-items-center">
                                <span className="border-circle flex-shrink-0 w-2rem h-2rem flex align-items-center justify-content-center bg-white-alpha-20">
                                    <i className={`pi ${item.icon} text-lg`}></i>
                                </span>
                                <div className="ml-2">
                                    <p className="font-semibold text-sm mt-0 mb-1">{item.label}</p>
                                    <p className="font-normal text-xs text-white-alpha-80 mt-0 mb-0">{item.description}</p>
                                </div>
                            </div>
                        </article>
                    ))}
                </div>

                <div className="p-2 bg-white-alpha-10 border-top-1 border-white-alpha-20 flex flex-wrap sm:flex-nowrap align-items-center">
                    <p className="hidden md:block mt-0 mb-0 mr-3 text-xs text-white-alpha-70">
                        <span className="px-2 py-1 border-white-alpha-20 border-1 border-round mr-1 text-white-alpha-80 text-xs bg-white-alpha-20">P</span> Select
                    </p>
                    <p className="hidden md:block mt-0 mb-0 mr-3 text-xs text-white-alpha-70">
                        <span className="px-2 py-1 border-white-alpha-20 border-1 border-round mr-1 text-white-alpha-80 text-xs bg-white-alpha-20">↑</span>
                        <span className="px-2 py-1 border-white-alpha-20 border-1 border-round mr-1 text-white-alpha-80 text-xs bg-white-alpha-20">↓</span> Navigate
                    </p>
                    <p className="hidden md:block mt-0 mb-0 mr-3 text-xs text-white-alpha-70">
                        <span className="px-2 py-1 border-white-alpha-20 border-1 border-round mr-1 text-white-alpha-80 text-xs bg-white-alpha-20">esc</span> Close
                    </p>
                    <p className="w-full md:w-auto mt-0 mb-0 md:ml-auto text-xs text-white-alpha-70">4 results</p>
                </div>
            </Dialog>
        </>
    );
};

export default CourseRegistration;
