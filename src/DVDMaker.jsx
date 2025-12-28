import React, { useState, useRef, useEffect } from 'react';
import {
    Image as ImageIcon,
    Bold,
    Italic,
    Underline,
    Download,
    Loader2,
    Clapperboard,
    Monitor,
    Clock,
    Languages
} from 'lucide-react';

import Barcode from './assets/barcode.png';
import DvdLogo from './assets/DVD_Video.png';
import AntiPiracy from './assets/copy_protection.png';

import GRating from './assets/MPAA_G.png';
import PGRating from './assets/MPAA_PG.png';
import PG13Rating from './assets/MPAA_PG-13.png';
import RRating from './assets/MPAA_R.png';
import NCRating from './assets/MPAA_NC.png';
import NoRating from './assets/MPAA_NR.png';
import XRating from './assets/MPAA_X.png';

const MPAA_OPTIONS = [
    { name: 'G', src: GRating },
    { name: 'PG', src: PGRating },
    { name: 'PG-13', src: PG13Rating },
    { name: 'R', src: RRating },
    { name: 'NC-17', src: NCRating },
    { name: 'Not Rated', src: NoRating },
    { name: 'X', src: XRating }, 
];

const FONTS = [
    { name: 'Cinematic', value: '"Trajan Pro", "Times New Roman", serif' },
    { name: 'Impact', value: 'Impact, Haettenschweiler, "Arial Narrow Bold", sans-serif' },
    { name: 'Arial', value: 'Arial, Helvetica, sans-serif' },
    { name: 'Verdana', value: 'Verdana, Geneva, sans-serif' },
    { name: 'Courier', value: '"Courier New", Courier, monospace' },
    { name: 'Georgia', value: 'Georgia, serif' },
    { name: 'Comic Sans', value: '"Comic Sans MS", "Comic Sans", cursive' },
];

const currentYear = new Date().getFullYear();
const LOREM_BILLING = `DIRECTED BY ALAN SMITHEE • PRODUCED BY JANE SMITH • SCREENPLAY BY ALICE WRITER • MUSIC BY BOB COMPOSER • EDITED BY CHARLIE EDITOR • CINEMATOGRAPHY BY DAVE LENS • STARRING ACTOR ONE, ACTOR TWO, ACTRESS THREE • EXECUTIVE PRODUCERS BIG BOSS, MONEY MAKER • A GENERIC PRODUCTION COMPANY FILM • DISTRIBUTED BY MAJOR STUDIO`;
const LOREM_LEGAL = `© ${currentYear} Major Studio Distribution. All rights reserved. Warning: For private home use only. Federal law provides severe civil and criminal penalties for the unauthorized reproduction, distribution or exhibition of copyrighted motion pictures and video formats. Made in Insert Country Here.`;

export default function App() {
    const [viewMode, setViewMode] = useState('front');
    const [activeTab, setActiveTab] = useState('title');
    const [isExporting, setIsExporting] = useState(false);

    const fileInputRef = useRef(null);
    const screenshotInputRef = useRef(null);

    // Single export ref for the current view
    const exportRef = useRef(null);

    // --- Content State ---
    const [titleText, setTitleText] = useState("THE MOVIE TITLE");
    const [reviewText, setReviewText] = useState('"⭐⭐⭐⭐⭐ A Cinematic Masterpiece!" - The Daily Review');
    const [starText, setStarText] = useState("A FILM BY FAMOUS DIRECTOR");

    const [bgImage, setBgImage] = useState(null);
    const [spineColor, setSpineColor] = useState('#2a2a2a');
    const [backBgColor, setBackBgColor] = useState('#888888');

    // Back View
    const [backHeadline, setBackHeadline] = useState("THEY THOUGHT IT WAS OVER...");
    const [backBlurb, setBackBlurb] = useState("In a world where everything is draggable, one developer stands against the bugs. Witness the ultimate battle for cleaner code and pixel-perfect exports. This summer, prepare to be rendered.");
    const [backScreenshots, setBackScreenshots] = useState([null, null, null]);
    const [activeScreenshotIndex, setActiveScreenshotIndex] = useState(0);
    const [billingBlock, setBillingBlock] = useState(LOREM_BILLING);
    const [legalText, setLegalText] = useState(LOREM_LEGAL);

    // Tech Specs
    const [techSpecs, setTechSpecs] = useState({
        languages: "Film languages go here.",
        aspect: "Screen size & aspect ratio goes here.",
        runtime: "Film runtime goes here."
    });

    // Rating (Image Based)
    const [mpaaRating, setMpaaRating] = useState(NoRating);

    // --- Styles State ---
    const [titleStyle, setTitleStyle] = useState({
        fontFamily: '"Trajan Pro", "Times New Roman", serif', fontSize: 48, color: '#ffffff', isBold: true, isItalic: false, isUnderline: false, textShadow: true
    });
    const [reviewStyle, setReviewStyle] = useState({
        fontFamily: 'Arial, Helvetica, sans-serif', fontSize: 16, color: '#ffd700', isBold: true, isItalic: true, isUnderline: false, textShadow: true
    });
    const [starStyle, setStarStyle] = useState({
        fontFamily: 'Arial, Helvetica, sans-serif', fontSize: 14, color: '#dddddd', isBold: false, isItalic: false, isUnderline: false, textShadow: true
    });

    // Spine
    const [sideTitleStyle, setSideTitleStyle] = useState({
        fontFamily: 'Arial, Helvetica, sans-serif', fontSize: 24, color: '#ffffff', isBold: true, isItalic: false, isUnderline: false, textShadow: false
    });

    // Back
    const [backHeadlineStyle, setBackHeadlineStyle] = useState({
        fontFamily: 'Impact, Haettenschweiler, sans-serif', fontSize: 32, color: '#ffffff', isBold: false, isItalic: false, isUnderline: false, textShadow: true
    });
    const [backBlurbStyle, setBackBlurbStyle] = useState({
        fontFamily: 'Arial, Helvetica, sans-serif', fontSize: 12, color: '#cccccc', isBold: false, isItalic: false, isUnderline: false, textShadow: false, textAlign: 'left'
    });
    const [billingStyle, setBillingStyle] = useState({
        fontFamily: '"Courier New", Courier, monospace', fontSize: 9, color: '#aaaaaa', isBold: false, isItalic: false, isUnderline: false, textShadow: false, textAlign: 'center'
    });
    const [legalStyle, setLegalStyle] = useState({
        fontFamily: 'Arial, Helvetica, sans-serif', fontSize: 8, color: '#666666', isBold: false, isItalic: false, isUnderline: false, textShadow: false, textAlign: 'justify'
    });

    // --- Position State (Offsets) ---
    const [titlePos, setTitlePos] = useState({ x: 0, y: 0 });
    const [reviewPos, setReviewPos] = useState({ x: 0, y: 0 });
    const [starPos, setStarPos] = useState({ x: 0, y: 0 });

    // --- Dragging State ---
    const [draggingItem, setDraggingItem] = useState(null);
    const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
    const [initialDragPos, setInitialDragPos] = useState({ x: 0, y: 0 });

    useEffect(() => {
        // Load html-to-image from CDN
        const script = document.createElement('script');
        script.src = "https://cdnjs.cloudflare.com/ajax/libs/html-to-image/1.11.11/html-to-image.min.js";
        script.async = true;
        document.body.appendChild(script);
        return () => {
            if (document.body.contains(script)) {
                document.body.removeChild(script);
            }
        }
    }, []);

    const readFileAsDataURL = (file) => {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.onload = (e) => resolve(e.target.result);
            reader.onerror = (e) => reject(e);
            reader.readAsDataURL(file);
        });
    };

    const handleImageUpload = async (e) => {
        const file = e.target.files[0];
        if (file) {
            try {
                const dataUrl = await readFileAsDataURL(file);
                setBgImage(dataUrl);
            } catch (err) {
                console.error("Error reading file", err);
            }
        }
    };

    const handleScreenshotUpload = async (e) => {
        const file = e.target.files[0];
        if (file) {
            try {
                const dataUrl = await readFileAsDataURL(file);
                const newScreenshots = [...backScreenshots];
                newScreenshots[activeScreenshotIndex] = dataUrl;
                setBackScreenshots(newScreenshots);
            } catch (err) {
                console.error("Error reading file", err);
            }
        }
    };

    const handleExport = async () => {
        if (!window.htmlToImage) {
            alert("Export library is loading. Please wait a moment.");
            return;
        }

        setIsExporting(true);
        try {
            await new Promise(resolve => setTimeout(resolve, 300));

            const node = exportRef.current;
            if (!node) throw new Error("Preview element not found");

            const dataUrl = await window.htmlToImage.toPng(node, {
                backgroundColor: null,
                scale: 3, // High quality
                style: { transform: 'scale(1)' },
                filter: (n) => {
                    if (!n || !n.classList) return true;
                    // Standard check for class string
                    const className = typeof n.className === 'string' ? n.className : '';
                    return !className.includes('exclude-from-export');
                },
            });

            const timestamp = new Date().getTime();
            const cleanTitle = titleText.replace(/[^a-z0-9]/gi, '_').toLowerCase() || 'game';
            const suffix = viewMode;

            const link = document.createElement('a');
            link.download = `${cleanTitle}_${suffix}_${timestamp}.png`;
            link.href = dataUrl;
            link.click();

        } catch (err) {
            console.error("Export failed:", err);
            alert("Export failed. Please check console.");
        } finally {
            setIsExporting(false);
        }
    };

    // --- DRAG HANDLERS ---
    const handleMouseDown = (e, item) => {
        if (isExporting) return;
        e.preventDefault();
        setDraggingItem(item);
        setDragStart({ x: e.clientX, y: e.clientY });

        if (item === 'title') setInitialDragPos({ ...titlePos });
        else if (item === 'review') setInitialDragPos({ ...reviewPos });
        else if (item === 'star') setInitialDragPos({ ...starPos });
    };

    useEffect(() => {
        const handleMouseMove = (e) => {
            if (!draggingItem) return;
            const dx = e.clientX - dragStart.x;
            const dy = e.clientY - dragStart.y;
            const newPos = { x: initialDragPos.x + dx, y: initialDragPos.y + dy };

            if (draggingItem === 'title') setTitlePos(newPos);
            else if (draggingItem === 'review') setReviewPos(newPos);
            else if (draggingItem === 'star') setStarPos(newPos);
        };

        const handleMouseUp = () => {
            setDraggingItem(null);
        };

        if (draggingItem) {
            window.addEventListener('mousemove', handleMouseMove);
            window.addEventListener('mouseup', handleMouseUp);
        }
        return () => {
            window.removeEventListener('mousemove', handleMouseMove);
            window.removeEventListener('mouseup', handleMouseUp);
        };
    }, [draggingItem, dragStart, initialDragPos]);

    const updateStyle = (key, value) => {
        let setter = null;
        if (viewMode === 'front') {
            if (activeTab === 'title') setter = setTitleStyle;
            if (activeTab === 'review') setter = setReviewStyle;
            if (activeTab === 'star') setter = setStarStyle;
        } else if (viewMode === 'side') {
            setter = setSideTitleStyle;
        } else if (viewMode === 'back') {
            if (activeTab === 'headline') setter = setBackHeadlineStyle;
            if (activeTab === 'blurb') setter = setBackBlurbStyle;
            if (activeTab === 'billing') setter = setBillingStyle;
            if (activeTab === 'legal') setter = setLegalStyle;
        }
        if (setter) setter(prev => ({ ...prev, [key]: value }));
    };

    const getCurrentStyle = () => {
        if (viewMode === 'front') {
            if (activeTab === 'title') return titleStyle;
            if (activeTab === 'review') return reviewStyle;
            if (activeTab === 'star') return starStyle;
        }
        if (viewMode === 'side') return sideTitleStyle;
        if (viewMode === 'back') {
            if (activeTab === 'headline') return backHeadlineStyle;
            if (activeTab === 'blurb') return backBlurbStyle;
            if (activeTab === 'billing') return billingStyle;
            return legalStyle;
        }
        return {};
    };

    const currentStyle = getCurrentStyle();

    // --- VIEWS ---

    const FrontView = ({ showBadges = true, innerRef }) => (
        <div ref={innerRef} className="relative w-[540px] h-[800px] bg-[#1a1a1a] shadow-2xl rounded-tr-lg rounded-br-lg overflow-hidden border-l-4 border-[#333]" style={{ boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.75)' }}>
            {/* Background */}
            {bgImage ? (
                <img src={bgImage} alt="Cover" className="absolute inset-0 w-full h-full object-cover z-0" />
            ) : (
                <div className="absolute inset-0 flex flex-col items-center justify-center text-[#404040] bg-[#1a1a1a] z-0">
                    <Clapperboard size={64} className="mb-2 opacity-20" />
                    <span className="text-sm font-mono uppercase tracking-widest opacity-30">No Poster</span>
                </div>
            )}

            {/* Overlay Gradient */}
            <div className="absolute inset-0 bg-gradient-to-b from-[#00000066] via-transparent to-[#000000cc] z-0 pointer-events-none"></div>

            {/* Draggable Layers */}
            <div className="absolute inset-0 z-30 pointer-events-none">

                {/* MOVIE TITLE */}
                <div
                    className={`absolute pointer-events-auto cursor-move p-2 border-2 rounded-lg ${showBadges && activeTab === 'title' && viewMode === 'front' ? 'border-[#a855f7] bg-[#0000004d]' : 'border-transparent hover:border-[#ffffff33]'}`}
                    style={{ bottom: '150px', left: '0', right: '0', margin: '0 auto', width: 'fit-content', transform: `translate(${titlePos.x}px, ${titlePos.y}px)` }}
                    onMouseDown={(e) => handleMouseDown(e, 'title')}
                    onClick={() => { setViewMode('front'); setActiveTab('title'); }}
                >
                    {showBadges && activeTab === 'title' && viewMode === 'front' && <div className="absolute -top-3 left-0 bg-[#a855f7] text-white text-[10px] px-2 rounded-full font-bold">TITLE</div>}
                    <h1 style={{ fontFamily: titleStyle.fontFamily, fontSize: `${titleStyle.fontSize}px`, color: titleStyle.color, fontWeight: titleStyle.isBold ? 'bold' : 'normal', fontStyle: titleStyle.isItalic ? 'italic' : 'normal', textDecoration: titleStyle.isUnderline ? 'underline' : 'none', textShadow: titleStyle.textShadow ? '0 4px 12px rgba(0,0,0,0.9)' : 'none', lineHeight: 1.1, textAlign: 'center', userSelect: 'none' }}>{titleText}</h1>
                </div>

                {/* REVIEW QUOTE */}
                <div
                    className={`absolute pointer-events-auto cursor-move p-2 border-2 rounded-lg ${showBadges && activeTab === 'review' && viewMode === 'front' ? 'border-[#a855f7] bg-[#0000004d]' : 'border-transparent hover:border-[#ffffff33]'}`}
                    style={{ top: '60px', left: '0', right: '0', margin: '0 auto', width: 'fit-content', maxWidth: '80%', transform: `translate(${reviewPos.x}px, ${reviewPos.y}px)` }}
                    onMouseDown={(e) => handleMouseDown(e, 'review')}
                    onClick={() => { setViewMode('front'); setActiveTab('review'); }}
                >
                    {showBadges && activeTab === 'review' && viewMode === 'front' && <div className="absolute -top-3 left-0 bg-[#a855f7] text-white text-[10px] px-2 rounded-full font-bold">REVIEW</div>}
                    <p style={{ fontFamily: reviewStyle.fontFamily, fontSize: `${reviewStyle.fontSize}px`, color: reviewStyle.color, fontWeight: reviewStyle.isBold ? 'bold' : 'normal', fontStyle: reviewStyle.isItalic ? 'italic' : 'normal', textDecoration: reviewStyle.isUnderline ? 'underline' : 'none', textShadow: reviewStyle.textShadow ? '0 2px 4px rgba(0,0,0,0.8)' : 'none', textAlign: 'center', userSelect: 'none' }}>{reviewText}</p>
                </div>

                {/* STAR/DIRECTOR */}
                <div
                    className={`absolute pointer-events-auto cursor-move p-2 border-2 rounded-lg ${showBadges && activeTab === 'star' && viewMode === 'front' ? 'border-[#a855f7] bg-[#0000004d]' : 'border-transparent hover:border-[#ffffff33]'}`}
                    style={{ top: '20px', left: '0', right: '0', margin: '0 auto', width: 'fit-content', transform: `translate(${starPos.x}px, ${starPos.y}px)` }}
                    onMouseDown={(e) => handleMouseDown(e, 'star')}
                    onClick={() => { setViewMode('front'); setActiveTab('star'); }}
                >
                    {showBadges && activeTab === 'star' && viewMode === 'front' && <div className="absolute -top-3 left-0 bg-[#a855f7] text-white text-[10px] px-2 rounded-full font-bold">CREDIT</div>}
                    <p style={{ fontFamily: starStyle.fontFamily, fontSize: `${starStyle.fontSize}px`, color: starStyle.color, fontWeight: starStyle.isBold ? 'bold' : 'normal', fontStyle: starStyle.isItalic ? 'italic' : 'normal', textDecoration: starStyle.isUnderline ? 'underline' : 'none', textShadow: starStyle.textShadow ? '0 2px 4px rgba(0,0,0,0.8)' : 'none', textAlign: 'center', userSelect: 'none', textTransform: 'uppercase', letterSpacing: '2px' }}>{starText}</p>
                </div>
            </div>
        </div>
    );

    const SideView = ({ showBadges = true, innerRef }) => (
        <div ref={innerRef} className="relative w-[800px] h-[100px] bg-[#1a1a1a] shadow-xl overflow-hidden flex items-center" style={{ backgroundColor: spineColor }}>
            <div className="absolute inset-0 bg-gradient-to-b from-[#ffffff1a] to-[#00000033] pointer-events-none z-10"></div>

            {/* Title Area Only - No Logos */}
            <div
                className={`flex-1 h-full flex items-center justify-center px-8 cursor-pointer relative ${showBadges && activeTab === 'title' && viewMode === 'side' ? 'bg-[#ffffff1a]' : ''}`}
                onClick={() => { setViewMode('side'); setActiveTab('title'); }}
            >
                <span style={{ fontFamily: sideTitleStyle.fontFamily, fontSize: `${sideTitleStyle.fontSize}px`, color: sideTitleStyle.color, fontWeight: sideTitleStyle.isBold ? 'bold' : 'normal', fontStyle: sideTitleStyle.isItalic ? 'italic' : 'normal', textDecoration: sideTitleStyle.isUnderline ? 'underline' : 'none', textShadow: '1px 1px 2px rgba(0,0,0,0.8)', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{titleText}</span>
            </div>
        </div>
    );

    const BackView = ({ showBadges = true, innerRef }) => (
        <div
            ref={innerRef}
            className="relative w-[540px] h-[800px] shadow-2xl rounded-tl-lg rounded-bl-lg overflow-hidden border-r-4 border-[#333] flex flex-col transition-colors"
            style={{ backgroundColor: backBgColor }}
        >
            {/* Headline */}
            <div className={`p-6 pb-2 cursor-pointer border-2 border-transparent hover:border-[#ffffff1a] ${showBadges && activeTab === 'headline' && viewMode === 'back' ? 'border-[#a855f7] bg-[#ffffff0d]' : ''}`} onClick={() => { setViewMode('back'); setActiveTab('headline'); }}>
                <h2 style={{ fontFamily: backHeadlineStyle.fontFamily, fontSize: `${backHeadlineStyle.fontSize}px`, color: backHeadlineStyle.color, fontWeight: backHeadlineStyle.isBold ? 'bold' : 'normal', fontStyle: backHeadlineStyle.isItalic ? 'italic' : 'normal', textDecoration: backHeadlineStyle.isUnderline ? 'underline' : 'none', textShadow: backHeadlineStyle.textShadow ? '0 2px 4px rgba(0,0,0,0.8)' : 'none', textAlign: 'center', lineHeight: 1.1, textTransform: 'uppercase' }}>{backHeadline}</h2>
            </div>

            {/* Blurb */}
            <div className={`px-6 pb-4 cursor-pointer border-2 border-transparent hover:border-[#ffffff1a] ${showBadges && activeTab === 'blurb' && viewMode === 'back' ? 'border-[#a855f7] bg-[#ffffff0d]' : ''}`} onClick={() => { setViewMode('back'); setActiveTab('blurb'); }}>
                <p style={{ fontFamily: backBlurbStyle.fontFamily, fontSize: `${backBlurbStyle.fontSize}px`, color: backBlurbStyle.color, fontWeight: backBlurbStyle.isBold ? 'bold' : 'normal', fontStyle: backBlurbStyle.isItalic ? 'italic' : 'normal', textDecoration: backBlurbStyle.isUnderline ? 'underline' : 'none', textAlign: backBlurbStyle.textAlign, lineHeight: 1.4 }}>{backBlurb}</p>
            </div>

            {/* Screenshots */}
            <div className="px-6 py-2 flex gap-2 justify-center h-[120px]">
                {backScreenshots.map((shot, idx) => (
                    <div key={idx} className={`flex-1 bg-black border border-[#525252] relative cursor-pointer group ${showBadges && activeTab === 'shots' && viewMode === 'back' ? 'ring-2 ring-[#a855f7]' : ''}`} onClick={() => { setViewMode('back'); setActiveTab('shots'); setActiveScreenshotIndex(idx); }}>
                        {shot ? <img src={shot} className="w-full h-full object-cover" /> : <div className="w-full h-full flex items-center justify-center"><ImageIcon size={16} className="text-[#525252]" /></div>}
                        {showBadges && activeTab === 'shots' && viewMode === 'back' && <div className="absolute inset-0 bg-[#a855f733] flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"><span className="text-[8px] font-bold text-white bg-[#00000080] px-1 rounded">EDIT</span></div>}
                    </div>
                ))}
            </div>

            <div className="flex-1 flex flex-col justify-end">
                {/* Billing Block */}
                <div className={`px-6 py-2 cursor-pointer border-2 border-transparent hover:border-[#ffffff1a] ${showBadges && activeTab === 'billing' && viewMode === 'back' ? 'border-[#a855f7] bg-[#ffffff0d]' : ''}`} onClick={() => { setViewMode('back'); setActiveTab('billing'); }}>
                    <p style={{ fontFamily: billingStyle.fontFamily, fontSize: `${billingStyle.fontSize}px`, color: billingStyle.color, fontWeight: billingStyle.isBold ? 'bold' : 'normal', fontStyle: billingStyle.isItalic ? 'italic' : 'normal', textDecoration: billingStyle.isUnderline ? 'underline' : 'none', textAlign: billingStyle.textAlign, textTransform: 'uppercase', lineHeight: 1.6, letterSpacing: '1px' }}>{billingBlock}</p>
                </div>

                {/* Legal Text (Above Table) */}
                <div className={`px-6 py-2 cursor-pointer border-2 border-transparent hover:border-[#ffffff1a] ${showBadges && activeTab === 'legal' && viewMode === 'back' ? 'border-[#a855f7]' : ''}`} onClick={() => { setViewMode('back'); setActiveTab('legal'); }}>
                    <p style={{ fontFamily: legalStyle.fontFamily, fontSize: `${legalStyle.fontSize}px`, color: legalStyle.color, fontWeight: legalStyle.isBold ? 'bold' : 'normal', fontStyle: legalStyle.isItalic ? 'italic' : 'normal', textDecoration: legalStyle.isUnderline ? 'underline' : 'none', textAlign: legalStyle.textAlign }}>{legalText}</p>
                </div>

                {/* Tech Specs Table */}
                <div className={`mx-6 mb-2 border border-[#525252] bg-[#0000004d] text-[9px] text-[#aaaaaa] flex cursor-pointer ${showBadges && activeTab === 'specs' && viewMode === 'back' ? 'border-[#a855f7]' : ''}`} onClick={() => { setViewMode('back'); setActiveTab('specs'); }}>
                    <div className="flex-1 p-1 border-r border-[#525252] flex items-center justify-center text-center">
                        <Languages size={10} className="mr-1 inline" /> {techSpecs.languages}
                    </div>
                    <div className="flex-1 p-1 border-r border-[#525252] flex items-center justify-center text-center">
                        <Monitor size={10} className="mr-1 inline" /> {techSpecs.aspect}
                    </div>
                    <div className="flex-1 p-1 flex items-center justify-center text-center">
                        <Clock size={10} className="mr-1 inline" /> {techSpecs.runtime}
                    </div>
                </div>

                {/* Footer Strip */}
                <div className="bg-[#00000066] px-6 py-4 border-t border-[#333] flex items-center justify-between gap-4 h-24">

                    {/* MPA Rating Box - IMAGE BASED */}
                    <div
                        className={`flex h-16 w-auto min-w-[120px] max-w-[200px] cursor-pointer hover:border-[#a855f7] transition-colors border-2 ${showBadges && activeTab === 'rating' && viewMode === 'back' ? 'border-[#a855f7] ring-1 ring-[#a855f7]' : 'border-transparent'}`}
                        onClick={() => { setViewMode('back'); setActiveTab('rating'); }}
                    >
                        <img src={mpaaRating} className="h-full w-auto object-contain bg-white" draggable="false" alt="MPAA Rating" />
                    </div>

                    {/* Logos */}
                    <div className="flex items-center gap-3">
                        {/* Use Pre-colored White SVGs to avoid filter issues on export */}
                        <img src={DvdLogo} className="h-16 w-auto opacity-90" draggable="false" alt="DVD Video" />
                        <img src={AntiPiracy} className="h-16 w-auto opacity-90" draggable="false" alt="Anti-Piracy" />
                    </div>

                    {/* Barcode */}
                    <div className="bg-white p-1 h-20 w-24 flex items-center justify-center">
                        <img src={Barcode} className="h-full w-full object-contain" draggable="false" alt="Barcode" />
                    </div>

                </div>
            </div>
        </div>
    );

    return (
        <div className="min-h-screen bg-neutral-900 text-neutral-100 font-sans selection:bg-purple-500 selection:text-white flex flex-col md:flex-row overflow-hidden">
            {/* Sidebar */}
            <div className="w-full md:w-96 bg-neutral-800 border-r border-neutral-700 flex flex-col h-[50vh] md:h-screen shadow-xl z-20">
                <div className="p-6 border-b border-neutral-700 bg-neutral-800"><h1 className="text-2xl font-bold flex items-center gap-2 text-purple-400"><Clapperboard className="w-6 h-6" /> DVD Forge</h1></div>
                <div className="flex p-2 gap-2 bg-neutral-900 border-b border-neutral-700">
                    {['front', 'side', 'back'].map(mode => (
                        <button key={mode} onClick={() => { setViewMode(mode); setActiveTab(mode === 'front' ? 'title' : mode === 'side' ? 'title' : 'headline'); }} className={`flex-1 py-2 rounded text-[10px] md:text-xs font-bold uppercase tracking-wider transition-all ${viewMode === mode ? 'bg-purple-600 text-white shadow-lg' : 'bg-neutral-800 text-neutral-500 hover:bg-neutral-700'}`}>{mode}</button>
                    ))}
                </div>

                <div className="flex-1 overflow-y-auto p-6 space-y-6">
                    {/* EDIT CONTROLS */}
                    <div className="space-y-6 animate-in fade-in duration-300">
                        <div className="bg-purple-900/20 border border-purple-900/50 p-2 rounded text-xs text-purple-300 font-mono text-center mb-4">EDITING: {viewMode.toUpperCase()} &gt; {activeTab.toUpperCase()}</div>

                        {!['rating', 'shots', 'specs', 'background', 'spine'].includes(activeTab) && (
                            <div className="space-y-2">
                                <label className="text-xs font-bold text-neutral-400 uppercase tracking-wider">Content</label>
                                {['blurb', 'billing', 'legal'].includes(activeTab) ? (
                                    <textarea rows={6} value={viewMode === 'back' && activeTab === 'blurb' ? backBlurb : activeTab === 'billing' ? billingBlock : legalText} onChange={(e) => activeTab === 'blurb' ? setBackBlurb(e.target.value) : activeTab === 'billing' ? setBillingBlock(e.target.value) : setLegalText(e.target.value)} className="w-full bg-neutral-900 border border-neutral-600 rounded-md p-3 text-neutral-100 focus:ring-2 focus:ring-purple-500 outline-none text-xs" />
                                ) : (
                                    <input type="text" value={viewMode === 'front' && activeTab === 'title' ? titleText : activeTab === 'review' ? reviewText : activeTab === 'star' ? starText : viewMode === 'back' && activeTab === 'headline' ? backHeadline : viewMode === 'side' ? titleText : ''} onChange={(e) => {
                                        if (activeTab === 'title') setTitleText(e.target.value);
                                        else if (activeTab === 'review') setReviewText(e.target.value);
                                        else if (activeTab === 'star') setStarText(e.target.value);
                                        else if (activeTab === 'headline') setBackHeadline(e.target.value);
                                    }} className="w-full bg-neutral-900 border border-neutral-600 rounded-md p-3 text-neutral-100 focus:ring-2 focus:ring-purple-500 outline-none" />
                                )}
                            </div>
                        )}

                        {/* Tech Specs Controls */}
                        {activeTab === 'specs' && (
                            <div className="space-y-4">
                                <div className="space-y-1"><label className="text-[10px] text-neutral-400 font-bold uppercase">Languages</label><input type="text" value={techSpecs.languages} onChange={(e) => setTechSpecs({ ...techSpecs, languages: e.target.value })} className="w-full bg-neutral-900 border border-neutral-600 rounded p-2 text-sm" /></div>
                                <div className="space-y-1"><label className="text-[10px] text-neutral-400 font-bold uppercase">Aspect Ratio</label><input type="text" value={techSpecs.aspect} onChange={(e) => setTechSpecs({ ...techSpecs, aspect: e.target.value })} className="w-full bg-neutral-900 border border-neutral-600 rounded p-2 text-sm" /></div>
                                <div className="space-y-1"><label className="text-[10px] text-neutral-400 font-bold uppercase">Runtime</label><input type="text" value={techSpecs.runtime} onChange={(e) => setTechSpecs({ ...techSpecs, runtime: e.target.value })} className="w-full bg-neutral-900 border border-neutral-600 rounded p-2 text-sm" /></div>
                            </div>
                        )}

                        {/* Rating Controls (Image Selection) */}
                        {activeTab === 'rating' && (
                            <div className="space-y-2">
                                <label className="text-xs font-bold text-neutral-400 uppercase tracking-wider">Select Rating</label>
                                <div className="grid grid-cols-2 gap-2">
                                    {MPAA_OPTIONS.map((opt) => (
                                        <button
                                            key={opt.name}
                                            className={`border rounded p-1 bg-neutral-900 hover:border-purple-400 transition-all flex items-center justify-center h-16 ${mpaaRating === opt.src ? 'border-purple-500 ring-2 ring-purple-400 bg-purple-900/20' : 'border-neutral-700'}`}
                                            onClick={() => setMpaaRating(opt.src)}
                                            title={opt.name}
                                        >
                                            <img src={opt.src} alt={opt.name} className="max-h-full max-w-full object-contain" />
                                        </button>
                                    ))}
                                </div>
                            </div>
                        )}

                        {/* STYLING TOOLS (Only for text tabs) */}
                        {!['background', 'shots', 'specs', 'rating'].includes(activeTab) && (
                            <>
                                <div className="space-y-2"><label className="text-xs font-bold text-neutral-400 uppercase tracking-wider">Font</label><select value={currentStyle.fontFamily} onChange={(e) => updateStyle('fontFamily', e.target.value)} className="w-full bg-neutral-900 border border-neutral-600 rounded-md p-2 text-sm text-neutral-200 outline-none">{FONTS.map(f => <option key={f.name} value={f.value}>{f.name}</option>)}</select></div>
                                <div className="grid grid-cols-2 gap-4"><div className="space-y-2"><label className="text-xs font-bold text-neutral-400 uppercase tracking-wider flex justify-between">Size <span>{currentStyle.fontSize}px</span></label><input type="range" min="6" max="120" value={currentStyle.fontSize} onChange={(e) => updateStyle('fontSize', parseInt(e.target.value))} className="w-full accent-purple-500 h-2 bg-neutral-700 rounded-lg appearance-none cursor-pointer" /></div><div className="space-y-2"><label className="text-xs font-bold text-neutral-400 uppercase tracking-wider">Color</label><div className="flex items-center gap-2 bg-neutral-900 border border-neutral-600 rounded-md p-1"><input type="color" value={currentStyle.color} onChange={(e) => updateStyle('color', e.target.value)} className="w-8 h-8 rounded cursor-pointer bg-transparent border-none" /></div></div></div>
                                <div className="flex bg-neutral-900 border border-neutral-600 rounded-md overflow-hidden"><button onClick={() => updateStyle('isBold', !currentStyle.isBold)} className={`flex-1 py-2 flex justify-center hover:bg-neutral-800 ${currentStyle.isBold ? 'bg-purple-900/30 text-purple-400' : 'text-neutral-400'}`}><Bold size={18} /></button><div className="w-px bg-neutral-700"></div><button onClick={() => updateStyle('isItalic', !currentStyle.isItalic)} className={`flex-1 py-2 flex justify-center hover:bg-neutral-800 ${currentStyle.isItalic ? 'bg-purple-900/30 text-purple-400' : 'text-neutral-400'}`}><Italic size={18} /></button><div className="w-px bg-neutral-700"></div><button onClick={() => updateStyle('isUnderline', !currentStyle.isUnderline)} className={`flex-1 py-2 flex justify-center hover:bg-neutral-800 ${currentStyle.isUnderline ? 'bg-purple-900/30 text-purple-400' : 'text-neutral-400'}`}><Underline size={18} /></button></div>
                            </>
                        )}

                        {/* VIEW SPECIFIC CONTROLS */}
                        {viewMode === 'front' && (
                            <div className="mt-8 pt-8 border-t border-neutral-700 space-y-4">
                                <h3 className="text-xs font-bold text-neutral-500 uppercase">Front Assets</h3>
                                <div className="border-2 border-dashed border-neutral-600 rounded-xl p-4 flex flex-col items-center justify-center text-center hover:border-purple-500 hover:bg-purple-900/5 transition-all cursor-pointer group" onClick={() => fileInputRef.current?.click()}>
                                    {bgImage ? <img src={bgImage} className="w-full h-24 object-cover rounded mb-2 opacity-50" /> : <ImageIcon className="text-neutral-400 mb-2" size={24} />}
                                    <span className="text-xs text-neutral-300 font-bold">Change Poster</span>
                                    <input type="file" ref={fileInputRef} className="hidden" accept="image/*" onChange={handleImageUpload} />
                                </div>
                                <div className="flex gap-2">
                                    <button onClick={() => setActiveTab('title')} className="flex-1 py-2 bg-neutral-800 border border-neutral-600 rounded text-xs hover:bg-neutral-700">Edit Title</button>
                                    <button onClick={() => setActiveTab('review')} className="flex-1 py-2 bg-neutral-800 border border-neutral-600 rounded text-xs hover:bg-neutral-700">Edit Review</button>
                                    <button onClick={() => setActiveTab('star')} className="flex-1 py-2 bg-neutral-800 border border-neutral-600 rounded text-xs hover:bg-neutral-700">Edit Credit</button>
                                </div>
                            </div>
                        )}

                        {viewMode === 'side' && (
                            <div className="mt-8 pt-8 border-t border-neutral-700 space-y-4">
                                <div className="space-y-2"><label className="text-xs font-bold text-neutral-400 uppercase tracking-wider">Spine Color</label><div className="flex items-center gap-2 bg-neutral-900 border border-neutral-600 rounded-md p-1"><input type="color" value={spineColor} onChange={(e) => setSpineColor(e.target.value)} className="w-8 h-8 rounded cursor-pointer bg-transparent border-none" /><span className="text-xs text-neutral-400 font-mono">{spineColor}</span></div></div>
                            </div>
                        )}

                        {viewMode === 'back' && (
                            <div className="mt-8 pt-8 border-t border-neutral-700 space-y-4">
                                <h3 className="text-xs font-bold text-neutral-500 uppercase">Back Assets</h3>
                                <div className="space-y-2"><label className="text-xs font-bold text-neutral-400 uppercase tracking-wider">Background Color</label><div className="flex items-center gap-2 bg-neutral-900 border border-neutral-600 rounded-md p-1"><input type="color" value={backBgColor} onChange={(e) => setBackBgColor(e.target.value)} className="w-8 h-8 rounded cursor-pointer bg-transparent border-none" /><span className="text-xs text-neutral-400 font-mono">{backBgColor}</span></div></div>

                                <div className="grid grid-cols-3 gap-2">
                                    {backScreenshots.map((shot, idx) => (
                                        <div key={idx} className={`aspect-video bg-black border border-neutral-600 rounded cursor-pointer overflow-hidden relative ${activeScreenshotIndex === idx ? 'ring-2 ring-purple-500' : ''}`} onClick={() => { setActiveTab('shots'); setActiveScreenshotIndex(idx); }}>
                                            {shot ? <img src={shot} className="w-full h-full object-cover" /> : <div className="w-full h-full flex items-center justify-center"><ImageIcon size={16} className="text-neutral-600" /></div>}
                                        </div>
                                    ))}
                                </div>
                                <div className="border-2 border-dashed border-neutral-600 rounded p-2 text-center cursor-pointer hover:border-purple-500" onClick={() => screenshotInputRef.current?.click()}>
                                    <span className="text-[10px] text-neutral-400">Upload to Slot {activeScreenshotIndex + 1}</span>
                                    <input type="file" ref={screenshotInputRef} className="hidden" accept="image/*" onChange={handleScreenshotUpload} />
                                </div>

                                <div className="flex gap-2 flex-wrap">
                                    <button onClick={() => setActiveTab('headline')} className="flex-1 py-2 bg-neutral-800 border border-neutral-600 rounded text-xs hover:bg-neutral-700">Headline</button>
                                    <button onClick={() => setActiveTab('blurb')} className="flex-1 py-2 bg-neutral-800 border border-neutral-600 rounded text-xs hover:bg-neutral-700">Blurb</button>
                                    <button onClick={() => setActiveTab('billing')} className="flex-1 py-2 bg-neutral-800 border border-neutral-600 rounded text-xs hover:bg-neutral-700">Billing</button>
                                    <button onClick={() => setActiveTab('legal')} className="flex-1 py-2 bg-neutral-800 border border-neutral-600 rounded text-xs hover:bg-neutral-700">Legal</button>
                                </div>
                                <div className="flex gap-2 flex-wrap">
                                    <button onClick={() => setActiveTab('specs')} className="flex-1 py-2 bg-neutral-800 border border-neutral-600 rounded text-xs hover:bg-neutral-700">Specs</button>
                                    <button onClick={() => setActiveTab('rating')} className="flex-1 py-2 bg-neutral-800 border border-neutral-600 rounded text-xs hover:bg-neutral-700">Rating</button>
                                </div>
                            </div>
                        )}
                    </div>
                </div>

                <div className="p-4 bg-neutral-900 border-t border-neutral-700 space-y-2">
                    <button onClick={handleExport} disabled={isExporting} className="w-full py-3 bg-white text-black font-bold rounded-md hover:bg-neutral-200 transition-colors flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed">
                        {isExporting ? <Loader2 className="animate-spin" size={18} /> : <Download size={18} />}
                        {isExporting ? "Rendering..." : "Export Current View"}
                    </button>
                </div>
            </div>

            {/* Preview Area */}
            <div className="flex-1 bg-neutral-950 p-8 flex flex-col items-center justify-center overflow-auto relative">
                <div className="absolute inset-0 pattern-grid opacity-10 pointer-events-none"></div>
                <div className="relative group transition-all duration-500 ease-in-out">
                    {viewMode === 'front' && <FrontView showBadges={!isExporting} innerRef={exportRef} />}
                    {viewMode === 'side' && <SideView showBadges={!isExporting} innerRef={exportRef} />}
                    {viewMode === 'back' && <BackView showBadges={!isExporting} innerRef={exportRef} />}
                </div>
            </div>

            <style>{`.pattern-grid { background-image: radial-gradient(#404040 1px, transparent 1px); background-size: 20px 20px; }`}</style>
        </div>
    );
}
