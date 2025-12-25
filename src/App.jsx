import React, { useState, useRef, useEffect } from 'react';
import {
    Type,
    Image as ImageIcon,
    Settings,
    Bold,
    Italic,
    Underline,
    Download,
    Layout,
    Monitor,
    Box,
    Loader2,
    Trash2,
    FileText,
    Gamepad2,
    AlertTriangle,
    Upload
} from 'lucide-react';

import ratingM from './assets/Mature.png';
import ratingT from './assets/T.webp';
import ratingE from './assets/E.png';
import ratingE10 from './assets/E10+.jpg';
import ratingAO from './assets/AO.webp';
import earlyChildhood from './assets/ec.png';
import KA from './assets/Kids_Adults.svg';
import ratingPending from './assets/RP.svg';   
import Pegi3 from './assets/3.jpg';
import Pegi7 from './assets/7.png';
import Pegi12 from './assets/12.png';
import Pegi16 from './assets/16.png';
import Pegi18 from './assets/18.png';
import CeroA from './assets/a.avif';
import CeroB from './assets/b.avif';
import CeroC from './assets/c.webp';
import CeroD from './assets/d.png';
import CeroZ from './assets/Z.png';
import Epilepsy_Warning from './assets/Epilepsy.png';

const RATING_IMAGES = [
    { name: 'Everyone', src: ratingE },
    { name: 'Everyone 10+', src: ratingE10 },
    { name: 'Teen', src: ratingT },
    { name: 'Mature', src: ratingM },
    { name: 'Adults Only', src: ratingAO },
    { name: 'Kids to Adults', src: KA },
    { name: 'Rating Pending', src: ratingPending },
    { name: 'Early Childhood', src: earlyChildhood },
    { name: 'PEGI 3', src: Pegi3 }, 
{ name: 'PEGI 7', src: Pegi7 },
    { name: 'PEGI 12', src: Pegi12 }, 
    { name: 'PEGI 16', src: Pegi16 },
    { name: 'PEGI 18', src: Pegi18 },
    { name: 'CERO A', src: CeroA },
    { name: 'CERO B', src: CeroB },
    { name: 'CERO C', src: CeroC },
    { name: 'CERO D', src: CeroD },
    { name: 'CERO Z', src: CeroZ },
];

const FONTS = [
    { name: 'Impact', value: 'Impact, Haettenschweiler, "Arial Narrow Bold", sans-serif' },
    { name: 'Arial', value: 'Arial, Helvetica, sans-serif' },
    { name: 'Verdana', value: 'Verdana, Geneva, sans-serif' },
    { name: 'Times New Roman', value: '"Times New Roman", Times, serif' },
    { name: 'Courier New', value: '"Courier New", Courier, monospace' },
    { name: 'Georgia', value: 'Georgia, serif' },
    { name: 'Trebuchet MS', value: '"Trebuchet MS", sans-serif' },
    { name: 'Comic Sans', value: '"Comic Sans MS", "Comic Sans", cursive' },
    { name: 'Military', value: '"Black Ops One", system-ui, cursive' },
];

const currentYear = new Date().getFullYear();
const LOREM_LEGAL = `© ${currentYear} Publisher Name Inc. All rights reserved. Game Title and the Game Title logo are registered trademarks of Publisher Name Inc. The "System" logo is a trademark of Console Manufacturer. Middleware and the Middleware symbol are trademarks of Middleware company. Uses Other Middleware technology. Copyright © ${currentYear - 25}-${currentYear} by Middleware, Inc. All other trademarks and copyrights are the property of their respective owners. Made in Insert Country Here.`;



const CONSOLE_TEMPLATES = [
    { name: "PS1", src: "/PS1.webp" },
    { name: "PS2", src: "/PS2.webp" },
    { name: "PS3", src: "/PS3.webp" },
    { name: "PS4", src: "/PS4.webp" },
    { name: "PS5", src: "/PS5.webp" },
    { name: "PSP", src: "/PSP.webp" },
    { name: "N64", src: "/N64.webp" },
    { name: "DS", src: "/DS.webp" },
    { name: "Dreamcast", src: "/Dreamcast.webp" },
    { name: "3DS", src: "/3DS.webp" },
    { name: "PSVita", src: "/PS_Vita.webp" },
    { name: "Nintendo Switch", src: "/NintendoSwitch.webp" },
    { name: "SNES", src: "/SNES.webp" },
    { name: "Switch2", src: "/Switch2.webp" },
    { name: "Wii U", src: "/Wii_U.webp" },
    { name: "Xbox", src: "/Xbox.webp" },
    { name: "Xbox 360", src: "/Xbox360.webp" },
    { name: "Xbox One", src: "/XboxOne.webp" },
    { name: "Game Boy", src: "/GameBoy.webp" },
    { name: "Game Boy Advance", src: "/GameBoyAdvance.webp" },
    { name: "Game Boy Color", src: "/GameBoyColor.webp" },
    { name: "GameCube", src: "/GameCube.webp" },
    { name: "GFWL", src: "/GFWL.jpg" },
    { name: "Sega Master System", src: "/SegaMasterSystem.webp" },
    { name: "Sega Saturn", src: "/SegaSaturn.webp" },
    { name: "Series X", src: "/SeriesX.webp" },
    { name: "Sega CD", src: "/SegaCD.webp" },
    { name: "Sega Genesis", src: "/SegaGenesis.webp" },
    { name: "Wii", src: "/Wii.webp" },
    { name: "Atari 2600", src: "/Atari2600.webp" },
    { name: "NeoGeo", src: "/NeoGeo.png" },
    { name: "3DO", src: "/3DO.png" },
    { name: "Turbografx-16", src: "/Turbografx.png" }
];

export default function App() {
    const [viewMode, setViewMode] = useState('front'); // 'front', 'side', 'back'
    const [activeTab, setActiveTab] = useState('title');
    const [isExporting, setIsExporting] = useState(false);

    const fileInputRef = useRef(null);
    const screenshotInputRef = useRef(null);
    const frontExportRef = useRef(null);
    const sideExportRef = useRef(null);
    const backExportRef = useRef(null);

    useEffect(() => {
        const script = document.createElement('script');
        script.src = "https://cdnjs.cloudflare.com/ajax/libs/html2canvas/1.4.1/html2canvas.min.js";
        script.async = true;
        document.body.appendChild(script);
        return () => {
            if (document.body.contains(script)) {
                document.body.removeChild(script);
            }
        }
    }, []);

    const [titleText, setTitleText] = useState("SUPER GAME TITLE");
    const [consoleText, setConsoleText] = useState("GAME SYSTEM");
    const [publisherText, setPublisherText] = useState("Studio Name");
    // Console template state: {name, src}
    const [consoleTemplate, setConsoleTemplate] = useState(CONSOLE_TEMPLATES.find(t => t.name === 'PS2') || CONSOLE_TEMPLATES[0]);
    const [bgImage, setBgImage] = useState(null);
    const [spineColor, setSpineColor] = useState('#2a2a2a');

    // FIXED: Added missing state for ratingImage
    const [ratingImage, setRatingImage] = useState(ratingM);

    const [backHeadline, setBackHeadline] = useState("EPIC PROMOTIONAL GAME BLURB");
    const [backScreenshots, setBackScreenshots] = useState([null, null, null]);
    const [activeScreenshotIndex, setActiveScreenshotIndex] = useState(0);

    const [specsData, setSpecsData] = useState({
        players: "1-4 Players",
        storage: "X GB Minimum",
        online: "Online Multiplayer",
    });

    const [backLogosText, setBackLogosText] = useState("Game Publisher • Game Developer • Middleware Logo");
    const [backLegalText, setBackLegalText] = useState(LOREM_LEGAL);

    const [titleStyle, setTitleStyle] = useState({
        fontFamily: 'Impact, Haettenschweiler, "Arial Narrow Bold", sans-serif', fontSize: 42, color: '#ffffff', isBold: false, isItalic: false, isUnderline: false, textShadow: true
    });
    const [publisherStyle, setPublisherStyle] = useState({
        fontFamily: 'Arial, Helvetica, sans-serif', fontSize: 14, color: '#ffffff', isBold: true, isItalic: false, isUnderline: false, textShadow: true
    });
    const [sideTitleStyle, setSideTitleStyle] = useState({
        fontFamily: 'Arial, Helvetica, sans-serif', fontSize: 18, color: '#ffffff', isBold: true, isItalic: false, isUnderline: false, textShadow: false
    });
    const [consoleStyle, setConsoleStyle] = useState({
        fontFamily: 'Arial, Helvetica, sans-serif', fontSize: 12, color: '#ffffff', isBold: true, isItalic: true, isUnderline: false, textShadow: false
    });

    const [backHeadlineStyle, setBackHeadlineStyle] = useState({
        fontFamily: 'Impact, Haettenschweiler, "Arial Narrow Bold", sans-serif', fontSize: 28, color: '#ffffff', isBold: false, isItalic: false, isUnderline: false, textShadow: true
    });
    const [backLegalStyle, setBackLegalStyle] = useState({
        fontFamily: 'Arial, Helvetica, sans-serif', fontSize: 8, color: '#aaaaaa', isBold: false, isItalic: false, isUnderline: false, textShadow: false
    });

    const handleImageUpload = (e) => {
        const file = e.target.files[0];
        if (file) {
            const url = URL.createObjectURL(file);
            setBgImage(url);
        }
    };

    const handleScreenshotUpload = (e) => {
        const file = e.target.files[0];
        if (file) {
            const url = URL.createObjectURL(file);
            const newScreenshots = [...backScreenshots];
            newScreenshots[activeScreenshotIndex] = url;
            setBackScreenshots(newScreenshots);
        }
    };

    const handleExport = async () => {
        if (!window.html2canvas) return;
        setIsExporting(true);

        setTimeout(async () => {
            try {
                const timestamp = new Date().getTime();
                const cleanTitle = titleText.replace(/[^a-z0-9]/gi, '_').toLowerCase() || 'game';

                const downloadCanvas = (canvas, suffix) => {
                    const link = document.createElement('a');
                    link.download = `${cleanTitle}_${suffix}_${timestamp}.png`;
                    link.href = canvas.toDataURL('image/png');
                    link.click();
                };

                if (frontExportRef.current) {
                    const frontCanvas = await window.html2canvas(frontExportRef.current, { scale: 3, backgroundColor: null, useCORS: true, logging: false });
                    downloadCanvas(frontCanvas, 'front');
                }

                setTimeout(async () => {
                    if (sideExportRef.current) {
                        const sideCanvas = await window.html2canvas(sideExportRef.current, { scale: 3, backgroundColor: null, useCORS: true, logging: false });
                        downloadCanvas(sideCanvas, 'side');
                    }
                }, 300);

                setTimeout(async () => {
                    if (backExportRef.current) {
                        const backCanvas = await window.html2canvas(backExportRef.current, { scale: 3, backgroundColor: null, useCORS: true, logging: false });
                        downloadCanvas(backCanvas, 'back');
                    }
                    setIsExporting(false);
                }, 600);

            } catch (err) {
                console.error("Export failed:", err);
                setIsExporting(false);
                alert("Failed to export images.");
            }
        }, 100);
    };

    const updateStyle = (key, value) => {
        let setter = null;

        if (viewMode === 'front') {
            if (activeTab === 'title') setter = setTitleStyle;
            if (activeTab === 'publisher') setter = setPublisherStyle;
        }
        else if (viewMode === 'side') {
            if (activeTab === 'title') setter = setSideTitleStyle;
            if (activeTab === 'console') setter = setConsoleStyle;
        }
        else if (viewMode === 'back') {
            if (activeTab === 'story') setter = setBackHeadlineStyle;
            if (activeTab === 'legal') setter = setBackLegalStyle;
        }

        if (setter) setter(prev => ({ ...prev, [key]: value }));
    };

    const getCurrentStyle = () => {
        if (viewMode === 'front') return activeTab === 'title' ? titleStyle : publisherStyle;
        if (viewMode === 'side') return activeTab === 'title' ? sideTitleStyle : consoleStyle;
        if (viewMode === 'back') return activeTab === 'story' ? backHeadlineStyle : backLegalStyle;
        return {};
    };

    const currentStyle = getCurrentStyle();
    const showTextControls = (
        (viewMode === 'front' && ['title', 'publisher'].includes(activeTab)) ||
        (viewMode === 'side' && ['title', 'console'].includes(activeTab)) ||
        (viewMode === 'back' && ['story', 'legal'].includes(activeTab))
    );


    const FrontView = ({ showBadges = true }) => (
        <div
            className="relative w-[340px] h-[480px] bg-neutral-900 shadow-2xl rounded-tr-lg rounded-br-lg overflow-hidden border-l-4 border-neutral-700 ring-1 ring-white/10"
            style={{ boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.75)' }}
        >
            {bgImage ? (
                <img src={bgImage} alt="Background" className="absolute inset-0 w-full h-full object-cover z-0" />
            ) : (
                <div className="absolute inset-0 flex flex-col items-center justify-center text-neutral-700 bg-neutral-800 z-0">
                    <ImageIcon size={64} className="mb-2 opacity-20" />
                    <span className="text-sm font-mono uppercase tracking-widest opacity-30">No Image</span>
                </div>
            )}
            <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-transparent to-black/80 z-0 pointer-events-none opacity-60"></div>
            <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/5 to-transparent z-20 pointer-events-none"></div>

            {/* Console template image header */}
            <div className="absolute top-0 left-0 right-0 h-12 z-20 flex items-center justify-center border-b border-white/20 bg-transparent">
                <img src={consoleTemplate.src} alt={consoleTemplate.name} className="max-h-10 object-contain" style={{maxWidth: '90%', maxHeight: '40px'}} draggable="false" />
            </div>

            <div className="absolute inset-0 z-10 flex flex-col justify-between p-6 mt-8">
                <div
                    className={`relative cursor-pointer transition-all duration-200 border-2 rounded-lg p-2 ${showBadges && activeTab === 'title' && viewMode === 'front' ? 'border-purple-500 bg-black/20 backdrop-blur-sm' : 'border-transparent hover:border-white/20'}`}
                    onClick={() => { setViewMode('front'); setActiveTab('title'); }}
                >
                    {showBadges && activeTab === 'title' && viewMode === 'front' && <div className="absolute -top-3 left-2 bg-purple-500 text-white text-[10px] px-2 rounded-full font-bold shadow-sm">EDITING</div>}
                    <h1 style={{
                        fontFamily: titleStyle.fontFamily, fontSize: `${titleStyle.fontSize}px`, color: titleStyle.color,
                        fontWeight: titleStyle.isBold ? 'bold' : 'normal', fontStyle: titleStyle.isItalic ? 'italic' : 'normal',
                        textDecoration: titleStyle.isUnderline ? 'underline' : 'none', textShadow: titleStyle.textShadow ? '0px 4px 12px rgba(0,0,0,0.9)' : 'none',
                        lineHeight: 1.1, textAlign: 'center', wordBreak: 'break-word'
                    }}>{titleText}</h1>
                </div>

                <div className="flex justify-end">
                    <div
                        className={`relative cursor-pointer transition-all duration-200 border-2 rounded-lg p-2 max-w-[80%] ${showBadges && activeTab === 'publisher' && viewMode === 'front' ? 'border-purple-500 bg-black/20 backdrop-blur-sm' : 'border-transparent hover:border-white/20'}`}
                        onClick={() => { setViewMode('front'); setActiveTab('publisher'); }}
                    >
                        {showBadges && activeTab === 'publisher' && viewMode === 'front' && <div className="absolute -top-3 right-2 bg-purple-500 text-white text-[10px] px-2 rounded-full font-bold shadow-sm">EDITING</div>}
                        <p style={{
                            fontFamily: publisherStyle.fontFamily, fontSize: `${publisherStyle.fontSize}px`, color: publisherStyle.color,
                            fontWeight: publisherStyle.isBold ? 'bold' : 'normal', fontStyle: publisherStyle.isItalic ? 'italic' : 'normal',
                            textDecoration: publisherStyle.isUnderline ? 'underline' : 'none', textShadow: publisherStyle.textShadow ? '0px 2px 4px rgba(0,0,0,0.9)' : 'none',
                            textAlign: 'right'
                        }}>{publisherText}</p>
                    </div>
                </div>

                {/* UPDATED: Uses state variable ratingImage */}
                <div className="absolute bottom-4 left-4 w-10 h-14 bg-white/90 border border-black shadow-md flex flex-col items-center justify-center pointer-events-none opacity-80 overflow-hidden">
                    <img src={ratingImage} alt="Rating" className="w-full h-full object-contain" draggable="false" />
                </div>
            </div>
        </div>
    );

    const SideView = ({ showBadges = true }) => (
        <div
            className="relative w-[480px] h-[60px] bg-neutral-800 shadow-xl overflow-hidden flex items-center"
            style={{ backgroundColor: spineColor }}
        >
            <div className="absolute inset-0 bg-gradient-to-b from-white/10 to-black/20 pointer-events-none z-10"></div>
            <div
                className={`h-full w-[120px] bg-gradient-to-b from-blue-600 to-blue-700 flex items-center justify-center border-r border-black/20 cursor-pointer relative ${showBadges && activeTab === 'console' && viewMode === 'side' ? 'ring-2 ring-purple-500 z-20' : ''}`}
                onClick={() => { setViewMode('side'); setActiveTab('console'); }}
            >
                <span style={{
                    fontFamily: consoleStyle.fontFamily, fontSize: `${consoleStyle.fontSize}px`, color: consoleStyle.color,
                    fontWeight: consoleStyle.isBold ? 'bold' : 'normal', fontStyle: consoleStyle.isItalic ? 'italic' : 'normal',
                    textDecoration: consoleStyle.isUnderline ? 'underline' : 'none',
                }}>{consoleText}</span>
            </div>
            <div
                className={`flex-1 h-full flex items-center justify-center px-4 cursor-pointer relative ${showBadges && activeTab === 'title' && viewMode === 'side' ? 'bg-black/10 ring-2 ring-purple-500 z-20' : ''}`}
                onClick={() => { setViewMode('side'); setActiveTab('title'); }}
            >
                {showBadges && activeTab === 'title' && viewMode === 'side' && <div className="absolute -top-2 right-2 bg-purple-500 text-white text-[8px] px-2 rounded-full font-bold shadow-sm">EDITING</div>}
                <span style={{
                    fontFamily: sideTitleStyle.fontFamily, fontSize: `${sideTitleStyle.fontSize}px`, color: sideTitleStyle.color,
                    fontWeight: sideTitleStyle.isBold ? 'bold' : 'normal', fontStyle: sideTitleStyle.isItalic ? 'italic' : 'normal',
                    textDecoration: sideTitleStyle.isUnderline ? 'underline' : 'none',
                    textShadow: sideTitleStyle.textShadow ? '1px 1px 2px rgba(0,0,0,0.8)' : 'none',
                    whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis'
                }}>{titleText}</span>
            </div>
        </div>
    );

    const BackView = ({ showBadges = true }) => (
        <div
            className="relative w-[340px] h-[480px] bg-neutral-900 shadow-2xl rounded-tl-lg rounded-bl-lg overflow-hidden border-r-4 border-neutral-700 ring-1 ring-white/10 flex flex-col"
            style={{ boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.75)' }}
        >
            <div className="absolute inset-0 bg-neutral-800 pattern-dots z-0"></div>

            <div
                className={`relative z-10 p-4 pb-2 cursor-pointer border-2 border-transparent hover:border-white/10 ${showBadges && activeTab === 'story' && viewMode === 'back' ? 'border-purple-500 bg-black/20' : ''}`}
                onClick={() => { setViewMode('back'); setActiveTab('story'); }}
            >
                <h2 style={{
                    fontFamily: backHeadlineStyle.fontFamily, fontSize: `${backHeadlineStyle.fontSize}px`, color: backHeadlineStyle.color,
                    fontWeight: backHeadlineStyle.isBold ? 'bold' : 'normal', fontStyle: backHeadlineStyle.isItalic ? 'italic' : 'normal',
                    textDecoration: backHeadlineStyle.isUnderline ? 'underline' : 'none', textShadow: backHeadlineStyle.textShadow ? '0px 2px 4px rgba(0,0,0,0.8)' : 'none',
                    textAlign: 'center', lineHeight: 1.1
                }}>
                    {backHeadline}
                </h2>
            </div>

            <div className="relative z-10 px-4 py-2 flex gap-2 justify-center h-[100px]">
                {backScreenshots.map((shot, idx) => (
                    <div
                        key={idx}
                        className={`flex-1 bg-black rounded overflow-hidden border border-neutral-600 relative cursor-pointer group ${showBadges && activeTab === 'shots' && viewMode === 'back' ? 'ring-2 ring-purple-500' : ''}`}
                        onClick={() => { setViewMode('back'); setActiveTab('shots'); setActiveScreenshotIndex(idx); }}
                    >
                        {shot ? (
                            <img src={shot} alt={`Screenshot ${idx + 1}`} className="w-full h-full object-cover" />
                        ) : (
                            <div className="w-full h-full flex items-center justify-center bg-neutral-800">
                                <ImageIcon size={16} className="text-neutral-600" />
                            </div>
                        )}
                        {showBadges && activeTab === 'shots' && viewMode === 'back' && (
                            <div className="absolute inset-0 bg-purple-500/20 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                                <span className="text-[8px] font-bold text-white bg-black/50 px-1 rounded">EDIT</span>
                            </div>
                        )}
                    </div>
                ))}
            </div>

            <div className="relative z-10 px-4 py-2 flex gap-2">
                <div
                    className={`w-1/3 bg-neutral-100 text-black p-2 rounded-sm text-[8px] font-bold space-y-1 cursor-pointer border-2 ${showBadges && activeTab === 'specs' && viewMode === 'back' ? 'border-purple-500' : 'border-transparent'}`}
                    onClick={() => { setViewMode('back'); setActiveTab('specs'); }}
                >
                    <div className="flex items-center gap-1 border-b border-neutral-300 pb-1">
                        <Gamepad2 size={10} /> <span>{specsData.players}</span>
                    </div>
                    <div className="flex items-center gap-1 border-b border-neutral-300 pb-1">
                        <Box size={10} /> <span>{specsData.storage}</span>
                    </div>
                    <div className="flex items-center gap-1">
                        <Monitor size={10} /> <span>{specsData.online}</span>
                    </div>
                </div>
                <div
                    className={`flex-1 flex items-center justify-center text-center p-2 cursor-pointer border-2 rounded ${showBadges && activeTab === 'specs' && viewMode === 'back' ? 'border-purple-500' : 'border-transparent'}`}
                    onClick={() => { setViewMode('back'); setActiveTab('specs'); }}
                >
                    <p className="text-[10px] text-neutral-300 font-bold uppercase leading-tight">{backLogosText}</p>
                </div>
            </div>

            <div className="relative z-10 px-4 py-2 flex-1 flex items-end">
                <div
                    className={`w-full cursor-pointer border-2 rounded p-1 ${showBadges && activeTab === 'legal' && viewMode === 'back' ? 'border-purple-500' : 'border-transparent'}`}
                    onClick={() => { setViewMode('back'); setActiveTab('legal'); }}
                >
                    <p style={{
                        fontFamily: backLegalStyle.fontFamily, fontSize: `${backLegalStyle.fontSize}px`, color: backLegalStyle.color,
                        fontWeight: backLegalStyle.isBold ? 'bold' : 'normal', fontStyle: backLegalStyle.isItalic ? 'italic' : 'normal',
                        textDecoration: backLegalStyle.isUnderline ? 'underline' : 'none',
                        textAlign: 'justify'
                    }}>
                        {backLegalText}
                    </p>
                </div>
            </div>

            <div className="relative z-10 p-2 bg-neutral-900 border-t border-neutral-700">
                <div className="border border-neutral-500 p-1 flex items-center justify-center">
                    <img
                        src={Epilepsy_Warning}
                        alt="Epilepsy Warning"
                        className="w-16 h-6 object-contain opacity-80"
                        draggable="false"
                    />
                </div>
            </div>

        </div>
    );

    return (
        <div className="min-h-screen bg-neutral-900 text-neutral-100 font-sans selection:bg-purple-500 selection:text-white flex flex-col md:flex-row overflow-hidden">

            <div className="w-full md:w-96 bg-neutral-800 border-r border-neutral-700 flex flex-col h-[50vh] md:h-screen shadow-xl z-20">
                <div className="p-6 border-b border-neutral-700 bg-neutral-800">
                    <h1 className="text-2xl font-bold flex items-center gap-2 text-purple-400">
                        <Box className="w-6 h-6" /> Box Art Forge
                    </h1>
                </div>

                <div className="flex p-2 gap-2 bg-neutral-900 border-b border-neutral-700">
                    {['front', 'side', 'back'].map(mode => (
                        <button
                            key={mode}
                            onClick={() => { setViewMode(mode); setActiveTab(mode === 'front' ? 'title' : mode === 'side' ? 'console' : 'story'); }}
                            className={`flex-1 py-2 rounded text-[10px] md:text-xs font-bold uppercase tracking-wider transition-all ${viewMode === mode ? 'bg-purple-600 text-white shadow-lg' : 'bg-neutral-800 text-neutral-500 hover:bg-neutral-700'}`}
                        >
                            {mode} View
                        </button>
                    ))}
                </div>

                <div className="flex border-b border-neutral-700 bg-neutral-900/50 overflow-x-auto">
                    {viewMode === 'front' && (
                        <>
                            <button onClick={() => setActiveTab('title')} className={`flex-1 py-4 px-2 text-xs font-medium flex justify-center items-center gap-2 ${activeTab === 'title' ? 'text-purple-400 border-b-2 border-purple-400 bg-neutral-800' : 'text-neutral-500'}`}><Type size={14} /> Title</button>
                            <button onClick={() => setActiveTab('publisher')} className={`flex-1 py-4 px-2 text-xs font-medium flex justify-center items-center gap-2 ${activeTab === 'publisher' ? 'text-purple-400 border-b-2 border-purple-400 bg-neutral-800' : 'text-neutral-500'}`}><Settings size={14} /> Pub</button>
                            <button onClick={() => setActiveTab('background')} className={`flex-1 py-4 px-2 text-xs font-medium flex justify-center items-center gap-2 ${activeTab === 'background' ? 'text-purple-400 border-b-2 border-purple-400 bg-neutral-800' : 'text-neutral-500'}`}><ImageIcon size={14} /> Art</button>
                        </>
                    )}
                    {viewMode === 'side' && (
                        <>
                            <button onClick={() => setActiveTab('console')} className={`flex-1 py-4 px-2 text-xs font-medium flex justify-center items-center gap-2 ${activeTab === 'console' ? 'text-purple-400 border-b-2 border-purple-400 bg-neutral-800' : 'text-neutral-500'}`}><Monitor size={14} /> Sys</button>
                            <button onClick={() => setActiveTab('title')} className={`flex-1 py-4 px-2 text-xs font-medium flex justify-center items-center gap-2 ${activeTab === 'title' ? 'text-purple-400 border-b-2 border-purple-400 bg-neutral-800' : 'text-neutral-500'}`}><Type size={14} /> Title</button>
                            <button onClick={() => setActiveTab('spine')} className={`flex-1 py-4 px-2 text-xs font-medium flex justify-center items-center gap-2 ${activeTab === 'spine' ? 'text-purple-400 border-b-2 border-purple-400 bg-neutral-800' : 'text-neutral-500'}`}><Layout size={14} /> Spine</button>
                        </>
                    )}
                    {viewMode === 'back' && (
                        <>
                            <button onClick={() => setActiveTab('story')} className={`flex-1 py-4 px-2 text-xs font-medium flex justify-center items-center gap-2 ${activeTab === 'story' ? 'text-purple-400 border-b-2 border-purple-400 bg-neutral-800' : 'text-neutral-500'}`}><Type size={14} /> Story</button>
                            <button onClick={() => setActiveTab('shots')} className={`flex-1 py-4 px-2 text-xs font-medium flex justify-center items-center gap-2 ${activeTab === 'shots' ? 'text-purple-400 border-b-2 border-purple-400 bg-neutral-800' : 'text-neutral-500'}`}><ImageIcon size={14} /> Shots</button>
                            <button onClick={() => setActiveTab('specs')} className={`flex-1 py-4 px-2 text-xs font-medium flex justify-center items-center gap-2 ${activeTab === 'specs' ? 'text-purple-400 border-b-2 border-purple-400 bg-neutral-800' : 'text-neutral-500'}`}><Box size={14} /> Specs</button>
                            <button onClick={() => setActiveTab('legal')} className={`flex-1 py-4 px-2 text-xs font-medium flex justify-center items-center gap-2 ${activeTab === 'legal' ? 'text-purple-400 border-b-2 border-purple-400 bg-neutral-800' : 'text-neutral-500'}`}><FileText size={14} /> Legal</button>
                        </>
                    )}
                </div>

                <div className="flex-1 overflow-y-auto p-6 space-y-6">

                    {showTextControls && (
                        <div className="space-y-6 animate-in fade-in duration-300">
                            <div className="bg-purple-900/20 border border-purple-900/50 p-2 rounded text-xs text-purple-300 font-mono text-center mb-4">
                                EDITING: {viewMode.toUpperCase()} &gt; {activeTab.toUpperCase()}
                            </div>

                            <div className="space-y-2">
                                <label className="text-xs font-bold text-neutral-400 uppercase tracking-wider">Content</label>
                                {activeTab === 'legal' || activeTab === 'story' ? (
                                    <textarea
                                        rows={activeTab === 'story' ? 2 : 6}
                                        value={viewMode === 'back' && activeTab === 'story' ? backHeadline : backLegalText}
                                        onChange={(e) => activeTab === 'story' ? setBackHeadline(e.target.value) : setBackLegalText(e.target.value)}
                                        className="w-full bg-neutral-900 border border-neutral-600 rounded-md p-3 text-neutral-100 focus:ring-2 focus:ring-purple-500 outline-none text-xs"
                                    />
                                ) : (
                                    <input
                                        type="text"
                    value={
                        viewMode === 'front' && activeTab === 'title' ? titleText :
                        viewMode === 'front' && activeTab === 'publisher' ? publisherText :
                        viewMode === 'side' && activeTab === 'title' ? titleText :
                        ''
                    }
                    onChange={(e) => {
                        if (activeTab === 'title') setTitleText(e.target.value);
                        else if (activeTab === 'publisher') setPublisherText(e.target.value);
                    }}
                                        className="w-full bg-neutral-900 border border-neutral-600 rounded-md p-3 text-neutral-100 focus:ring-2 focus:ring-purple-500 outline-none"
                                    />
                                )}
                            </div>

                            <div className="space-y-2">
                                <label className="text-xs font-bold text-neutral-400 uppercase tracking-wider">Font</label>
                                <select value={currentStyle.fontFamily} onChange={(e) => updateStyle('fontFamily', e.target.value)} className="w-full bg-neutral-900 border border-neutral-600 rounded-md p-2 text-sm text-neutral-200 outline-none">
                                    {FONTS.map(f => <option key={f.name} value={f.value}>{f.name}</option>)}
                                </select>
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <label className="text-xs font-bold text-neutral-400 uppercase tracking-wider flex justify-between">Size <span>{currentStyle.fontSize}px</span></label>
                                    <input type="range" min="6" max="120" value={currentStyle.fontSize} onChange={(e) => updateStyle('fontSize', parseInt(e.target.value))} className="w-full accent-purple-500 h-2 bg-neutral-700 rounded-lg appearance-none cursor-pointer" />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-xs font-bold text-neutral-400 uppercase tracking-wider">Color</label>
                                    <div className="flex items-center gap-2 bg-neutral-900 border border-neutral-600 rounded-md p-1">
                                        <input type="color" value={currentStyle.color} onChange={(e) => updateStyle('color', e.target.value)} className="w-8 h-8 rounded cursor-pointer bg-transparent border-none" />
                                    </div>
                                </div>
                            </div>

                            <div className="flex bg-neutral-900 border border-neutral-600 rounded-md overflow-hidden">
                                <button onClick={() => updateStyle('isBold', !currentStyle.isBold)} className={`flex-1 py-2 flex justify-center hover:bg-neutral-800 ${currentStyle.isBold ? 'bg-purple-900/30 text-purple-400' : 'text-neutral-400'}`}><Bold size={18} /></button>
                                <div className="w-px bg-neutral-700"></div>
                                <button onClick={() => updateStyle('isItalic', !currentStyle.isItalic)} className={`flex-1 py-2 flex justify-center hover:bg-neutral-800 ${currentStyle.isItalic ? 'bg-purple-900/30 text-purple-400' : 'text-neutral-400'}`}><Italic size={18} /></button>
                                <div className="w-px bg-neutral-700"></div>
                                <button onClick={() => updateStyle('isUnderline', !currentStyle.isUnderline)} className={`flex-1 py-2 flex justify-center hover:bg-neutral-800 ${currentStyle.isUnderline ? 'bg-purple-900/30 text-purple-400' : 'text-neutral-400'}`}><Underline size={18} /></button>
                            </div>
                        </div>
                    )}

                    {viewMode === 'front' && activeTab === 'background' && (
                        <div className="space-y-6 animate-in fade-in duration-300">
                            <div className="border-2 border-dashed border-neutral-600 rounded-xl p-8 flex flex-col items-center justify-center text-center hover:border-purple-500 hover:bg-purple-900/5 transition-all cursor-pointer group" onClick={() => fileInputRef.current?.click()}>
                                {bgImage ? <img src={bgImage} className="w-16 h-16 object-cover rounded-full mb-4 opacity-50" /> : <ImageIcon className="text-neutral-400 mb-4" size={32} />}
                                <h3 className="font-bold text-neutral-200">Cover Art</h3>
                                <input type="file" ref={fileInputRef} className="hidden" accept="image/*" onChange={handleImageUpload} />
                            </div>
                            {bgImage && <button onClick={() => setBgImage(null)} className="w-full py-2 bg-red-900/30 text-red-400 border border-red-900/50 rounded-md flex items-center justify-center gap-2"><Trash2 size={16} /> Remove</button>}

                            {/* Console Template Selector */}
                            <div className="space-y-2">
                                <label className="text-xs font-bold text-neutral-400 uppercase tracking-wider">Console Template</label>
                                <div className="flex gap-2 flex-wrap">
                                    {CONSOLE_TEMPLATES.map(template => (
                                        <button
                                            key={template.name}
                                            type="button"
                                            className={`border rounded p-1 bg-neutral-900 hover:border-purple-400 transition-all ${consoleTemplate.name === template.name ? 'border-purple-500 ring-2 ring-purple-400' : 'border-neutral-700'}`}
                                            onClick={() => setConsoleTemplate(template)}
                                            title={template.name}
                                            aria-label={`Select template ${template.name}`}
                                        >
                                            <img src={template.src} alt={template.name} className="w-12 h-8 object-contain" draggable="false" />
                                        </button>
                                    ))}
                                </div>
                            </div>

                            {/* Rating Selector using defined RATING_IMAGES */}
                            <div className="space-y-2">
                                <label className="text-xs font-bold text-neutral-400 uppercase tracking-wider">Rating</label>
                                <div className="flex gap-2 flex-wrap">
                                    {RATING_IMAGES.map(rating => (
                                        <button
                                            key={rating.name}
                                            type="button"
                                            className={`border rounded p-1 bg-neutral-900 hover:border-purple-400 transition-all ${ratingImage === rating.src ? 'border-purple-500 ring-2 ring-purple-400' : 'border-neutral-700'}`}
                                            onClick={() => setRatingImage(rating.src)}
                                            title={rating.name}
                                            aria-label={`Select rating ${rating.name}`}
                                        >
                                            <img src={rating.src} alt={rating.name} className="w-8 h-8 object-contain" draggable="false" />
                                        </button>
                                    ))}
                                </div>
                            </div>
                        </div>
                    )}

                    {viewMode === 'side' && activeTab === 'spine' && (
                        <div className="space-y-6 animate-in fade-in duration-300">
                            <div className="space-y-2">
                                <label className="text-xs font-bold text-neutral-400 uppercase tracking-wider">Spine Color</label>
                                <div className="flex items-center gap-2 bg-neutral-900 border border-neutral-600 rounded-md p-1">
                                    <input type="color" value={spineColor} onChange={(e) => setSpineColor(e.target.value)} className="w-8 h-8 rounded cursor-pointer bg-transparent border-none" />
                                    <span className="text-xs text-neutral-400 font-mono">{spineColor}</span>
                                </div>
                            </div>
                        </div>
                    )}

                    {viewMode === 'back' && activeTab === 'shots' && (
                        <div className="space-y-6 animate-in fade-in duration-300">
                            <div className="grid grid-cols-3 gap-2 mb-4">
                                {backScreenshots.map((shot, idx) => (
                                    <div
                                        key={idx}
                                        onClick={() => setActiveScreenshotIndex(idx)}
                                        className={`aspect-[4/3] bg-neutral-800 border-2 rounded cursor-pointer overflow-hidden ${activeScreenshotIndex === idx ? 'border-purple-500 ring-2 ring-purple-500/50' : 'border-neutral-600'}`}
                                    >
                                        {shot ? <img src={shot} className="w-full h-full object-cover" /> : <div className="w-full h-full flex items-center justify-center"><ImageIcon size={12} className="text-neutral-600" /></div>}
                                    </div>
                                ))}
                            </div>

                            <div className="border-2 border-dashed border-neutral-600 rounded-xl p-6 flex flex-col items-center justify-center text-center hover:border-purple-500 hover:bg-purple-900/5 transition-all cursor-pointer" onClick={() => screenshotInputRef.current?.click()}>
                                <Upload className="text-neutral-400 mb-2" size={24} />
                                <p className="text-xs text-neutral-300 font-bold">Upload to Slot {activeScreenshotIndex + 1}</p>
                                <input type="file" ref={screenshotInputRef} className="hidden" accept="image/*" onChange={handleScreenshotUpload} />
                            </div>
                            {backScreenshots[activeScreenshotIndex] && (
                                <button onClick={() => {
                                    const newShots = [...backScreenshots];
                                    newShots[activeScreenshotIndex] = null;
                                    setBackScreenshots(newShots);
                                }} className="w-full py-2 bg-red-900/30 text-red-400 border border-red-900/50 rounded-md text-xs font-bold">Clear Slot {activeScreenshotIndex + 1}</button>
                            )}
                        </div>
                    )}

                    {viewMode === 'back' && activeTab === 'specs' && (
                        <div className="space-y-4 animate-in fade-in duration-300">
                            <div className="space-y-2">
                                <label className="text-xs font-bold text-neutral-400 uppercase tracking-wider">Player Count</label>
                                <input type="text" value={specsData.players} onChange={(e) => setSpecsData({ ...specsData, players: e.target.value })} className="w-full bg-neutral-900 border border-neutral-600 rounded-md p-2 text-neutral-100 text-sm" />
                            </div>
                            <div className="space-y-2">
                                <label className="text-xs font-bold text-neutral-400 uppercase tracking-wider">File Size</label>
                                <input type="text" value={specsData.storage} onChange={(e) => setSpecsData({ ...specsData, storage: e.target.value })} className="w-full bg-neutral-900 border border-neutral-600 rounded-md p-2 text-neutral-100 text-sm" />
                            </div>
                            <div className="space-y-2">
                                <label className="text-xs font-bold text-neutral-400 uppercase tracking-wider">Network Features</label>
                                <input type="text" value={specsData.online} onChange={(e) => setSpecsData({ ...specsData, online: e.target.value })} className="w-full bg-neutral-900 border border-neutral-600 rounded-md p-2 text-neutral-100 text-sm" />
                            </div>
                            <div className="border-t border-neutral-700 my-4 pt-4 space-y-2">
                                <label className="text-xs font-bold text-neutral-400 uppercase tracking-wider">Logos & Middleware</label>
                                <input type="text" value={backLogosText} onChange={(e) => setBackLogosText(e.target.value)} className="w-full bg-neutral-900 border border-neutral-600 rounded-md p-2 text-neutral-100 text-sm" />
                            </div>
                        </div>
                    )}

                </div>

                <div className="p-4 bg-neutral-900 border-t border-neutral-700 space-y-2">
                    <button
                        onClick={handleExport}
                        disabled={isExporting}
                        className="w-full py-3 bg-white text-black font-bold rounded-md hover:bg-neutral-200 transition-colors flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        {isExporting ? <Loader2 className="animate-spin" size={18} /> : <Download size={18} />}
                        {isExporting ? "Rendering..." : "Export All (3 Files)"}
                    </button>
                </div>
            </div>

            <div className="flex-1 bg-neutral-950 p-8 flex flex-col items-center justify-center overflow-auto relative">
                <div className="absolute inset-0 pattern-grid opacity-10 pointer-events-none"></div>

                <div className="mb-8 text-center animate-in fade-in slide-in-from-top-4 z-10">
                    <h2 className="text-xl font-bold text-neutral-300 flex items-center justify-center gap-2">
                        {viewMode === 'front' ? "Front Preview" : viewMode === 'side' ? "Side Preview" : "Back Preview"}
                    </h2>
                    <p className="text-sm text-neutral-500">
                        {viewMode === 'side' ? "480 x 60px" : "340 x 480px"}
                    </p>
                </div>

                <div className="relative group transition-all duration-500 ease-in-out">
                    {viewMode === 'front' && <FrontView />}
                    {viewMode === 'side' && <SideView />}
                    {viewMode === 'back' && <BackView />}
                </div>
            </div>

            <div style={{ position: 'fixed', left: '-9999px', top: 0 }}>
                <div ref={frontExportRef}><FrontView showBadges={false} /></div>
                <div ref={sideExportRef}><SideView showBadges={false} /></div>
                <div ref={backExportRef}><BackView showBadges={false} /></div>
            </div>

            <style>{`
        .pattern-grid {
          background-image: radial-gradient(#404040 1px, transparent 1px);
          background-size: 20px 20px;
        }
        .pattern-dots {
          background-image: radial-gradient(rgba(255,255,255,0.05) 1px, transparent 1px);
          background-size: 10px 10px;
        }
      `}</style>
        </div>
    );
}