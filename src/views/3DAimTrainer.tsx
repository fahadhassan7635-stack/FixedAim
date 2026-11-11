"use client";

import React, { useEffect, useRef, useState, useCallback } from 'react';
import { Maximize, Minimize } from 'lucide-react';

const aimTrainerHTML = `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no, viewport-fit=cover">
<title>AIM TRAINER - PRO</title>
<style>
  * { margin: 0; padding: 0; box-sizing: border-box; }
  body {
    background: #0a0a0c;
    color: #e8e8e8;
    font-family: 'Segoe UI', system-ui, sans-serif;
    overflow: hidden;
    user-select: none;
    -webkit-user-select: none;
  }
  #canvas {
    position: fixed;
    top: 0; left: 0;
    width: 100vw; height: 100vh;
    display: block;
    cursor: none;
  }
  #hud {
    position: fixed;
    top: 0; left: 0;
    width: 100vw; height: 100vh;
    pointer-events: none;
    display: none;
    z-index: 10;
  }
  #hud.active { display: block; }
  #crosshair {
    position: absolute;
    top: 50%; left: 50%;
    transform: translate(-50%, -50%);
    width: 24px; height: 24px;
    transition: transform 0.05s ease;
  }
  #crosshair svg { display: block; overflow: visible; }
  #hud.scoped #crosshair { display: none; }
  #crosshair.recoil { transform: translate(-50%, calc(-50% - 4px)); }
  #hitmarker {
    position: absolute;
    top: 50%; left: 50%;
    transform: translate(-50%, -50%) rotate(45deg);
    width: 18px; height: 18px;
    opacity: 0;
    pointer-events: none;
    z-index: 3;
  }
  #hitmarker::before, #hitmarker::after {
    content: '';
    position: absolute;
    background: #ff4444;
    border-radius: 1px;
  }
  #hitmarker::before { width: 2px; height: 8px; top: 5px; left: 8px; }
  #hitmarker::after { width: 8px; height: 2px; top: 8px; left: 5px; }
  #hitmarker.flash { animation: hitflash 0.12s ease-out forwards; }
  @keyframes hitflash {
    0% { opacity: 1; transform: translate(-50%, -50%) rotate(45deg) scale(1.2); }
    100% { opacity: 0; transform: translate(-50%, -50%) rotate(45deg) scale(0.9); }
  }
  #stats {
    position: absolute;
    top: 45px; left: 18px;
    display: flex;
    flex-direction: column;
    gap: 6px;
    z-index: 3;
  }
  .stat-row {
    display: flex;
    align-items: center;
    gap: 10px;
    background: rgba(0,0,0,0.45);
    backdrop-filter: blur(6px);
    border: 1px solid rgba(255,255,255,0.08);
    border-radius: 6px;
    padding: 5px 12px;
    min-width: 130px;
  }
  .stat-label {
    font-size: 10px;
    font-weight: 600;
    letter-spacing: 0.12em;
    text-transform: uppercase;
    color: rgba(255,255,255,0.45);
  }
  .stat-value {
    font-size: 15px;
    font-weight: 700;
    color: #ffffff;
    margin-left: auto;
    letter-spacing: 0.04em;
    font-variant-numeric: tabular-nums;
  }
  .stat-value.accent { color: #4fc3f7; }
  .stat-value.good { color: #69f0ae; }
  .stat-value.bad { color: #ff5252; }
  #timer-panel {
    position: absolute;
    top: 18px;
    left: 50%;
    transform: translateX(-50%);
    background: rgba(0,0,0,0.5);
    backdrop-filter: blur(6px);
    border: 1px solid rgba(255,255,255,0.1);
    border-radius: 8px;
    padding: 8px 22px;
    text-align: center;
    z-index: 3;
  }
  #timer-label {
    font-size: 9px;
    font-weight: 600;
    letter-spacing: 0.14em;
    text-transform: uppercase;
    color: rgba(255,255,255,0.4);
    margin-bottom: 2px;
  }
  #timer-value {
    font-size: 28px;
    font-weight: 800;
    color: #ffffff;
    letter-spacing: 0.04em;
    font-variant-numeric: tabular-nums;
  }
  #fps {
    position: absolute;
    top: 52px; right: 18px;
    background: rgba(0,0,0,0.4);
    border: 1px solid rgba(255,255,255,0.07);
    border-radius: 6px;
    padding: 5px 12px;
    font-size: 11px;
    font-weight: 600;
    color: rgba(255,255,255,0.5);
    letter-spacing: 0.06em;
    font-variant-numeric: tabular-nums;
    z-index: 3;
  }
  .score-popup {
    position: absolute;
    font-size: 13px;
    font-weight: 700;
    color: #69f0ae;
    pointer-events: none;
    text-shadow: 0 1px 4px rgba(0,0,0,0.9);
    animation: floatUp 0.55s ease-out forwards;
    letter-spacing: 0.04em;
    z-index: 3;
  }
  @keyframes floatUp {
    0% { opacity: 1; transform: translateY(0); }
    100% { opacity: 0; transform: translateY(-28px); }
  }
  .screen {
    position: fixed;
    top: 0; left: 0;
    width: 100vw; height: 100vh;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    justify-content: safe center;
    overflow-y: auto;
    padding: 20px 0;
    z-index: 100;
    background: rgba(6,6,8,0.96);
    backdrop-filter: blur(12px);
  }
  /* â”€â”€ Crosshair settings â”€â”€ */
  .ch-panel {
    width: min(340px, 88vw); margin-bottom: 20px;
    background: rgba(255,255,255,0.04); border: 1px solid rgba(255,255,255,0.1);
    border-radius: 10px; padding: 0;
  }
  .ch-panel summary {
    cursor: pointer; list-style: none; padding: 11px 16px; text-align: center;
    font-size: 11px; font-weight: 700; letter-spacing: 0.16em; text-transform: uppercase;
    color: rgba(255,255,255,0.55);
  }
  .ch-panel summary::-webkit-details-marker { display: none; }
  .ch-panel[open] summary { color: #4fc3f7; border-bottom: 1px solid rgba(255,255,255,0.08); }
  .ch-body { padding: 14px 16px 16px; display: flex; flex-direction: column; gap: 11px; }
  .ch-preview {
    height: 92px; border-radius: 8px; display: flex; align-items: center; justify-content: center;
    background: linear-gradient(135deg, #2a2a30 0%, #1a1a1e 100%); border: 1px solid rgba(255,255,255,0.08);
  }
  .ch-row { display: flex; align-items: center; gap: 10px; }
  .ch-row label { width: 78px; font-size: 10px; font-weight: 700; letter-spacing: 0.12em; text-transform: uppercase; color: rgba(255,255,255,0.4); }
  .ch-row input[type=range] { flex: 1; accent-color: #4fc3f7; cursor: pointer; }
  .ch-row .ch-val { width: 26px; text-align: right; font-size: 12px; font-weight: 700; color: #4fc3f7; font-variant-numeric: tabular-nums; }
  .ch-row select {
    flex: 1; background: rgba(255,255,255,0.08); color: #fff; border: 1px solid rgba(255,255,255,0.15);
    border-radius: 6px; padding: 6px 8px; font-size: 12px; cursor: pointer;
  }
  .ch-row select option { background: #15151a; color: #fff; }
  .ch-row input[type=color] { width: 34px; height: 26px; border: none; background: none; padding: 0; cursor: pointer; }
  .ch-swatches { display: flex; gap: 6px; flex: 1; }
  .ch-sw { width: 20px; height: 20px; border-radius: 50%; border: 2px solid rgba(255,255,255,0.25); cursor: pointer; padding: 0; }
  .ch-sw:hover { border-color: #fff; }
  .ch-row input[type=checkbox] { accent-color: #4fc3f7; cursor: pointer; width: 16px; height: 16px; }
  .ch-reset {
    align-self: center; background: rgba(255,255,255,0.06); color: rgba(255,255,255,0.65);
    border: 1px solid rgba(255,255,255,0.12); border-radius: 6px; padding: 6px 18px;
    font-size: 10px; font-weight: 700; letter-spacing: 0.14em; text-transform: uppercase; cursor: pointer;
  }
  .ch-reset:hover { background: rgba(255,255,255,0.12); }
  .screen.hidden { display: none; }
  .logo {
    font-size: 11px;
    font-weight: 700;
    letter-spacing: 0.32em;
    text-transform: uppercase;
    color: rgba(255,255,255,0.3);
    margin-bottom: 14px;
  }
  .title {
    font-size: clamp(42px, 6vw, 72px);
    font-weight: 900;
    letter-spacing: -0.02em;
    color: #ffffff;
    line-height: 1;
    margin-bottom: 6px;
  }
  .title span {
    background: linear-gradient(135deg, #4fc3f7 0%, #81d4fa 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
  }
  .subtitle {
    font-size: 14px;
    color: rgba(255,255,255,0.35);
    letter-spacing: 0.08em;
    margin-bottom: 40px;
    text-transform: uppercase;
    font-weight: 500;
  }
  .btn-primary {
    background: linear-gradient(135deg, #4fc3f7 0%, #0288d1 100%);
    color: #fff;
    border: none;
    border-radius: 8px;
    font-size: 13px;
    font-weight: 700;
    letter-spacing: 0.14em;
    text-transform: uppercase;
    padding: 15px 48px;
    cursor: pointer;
    transition: opacity 0.15s, transform 0.12s;
    box-shadow: 0 4px 24px rgba(79,195,247,0.25);
    margin-bottom: 14px;
    min-width: 200px;
  }
  .btn-primary:hover { opacity: 0.9; transform: translateY(-1px); }
  .btn-primary:active { transform: translateY(0); opacity: 0.8; }
  .btn-secondary {
    background: rgba(255,255,255,0.06);
    color: rgba(255,255,255,0.7);
    border: 1px solid rgba(255,255,255,0.1);
    border-radius: 8px;
    font-size: 12px;
    font-weight: 600;
    letter-spacing: 0.12em;
    text-transform: uppercase;
    padding: 12px 40px;
    cursor: pointer;
    transition: background 0.15s, color 0.15s;
    min-width: 200px;
  }
  .btn-secondary:hover { background: rgba(255,255,255,0.1); color: rgba(255,255,255,0.9); }
  .info-grid { display: flex; gap: 16px; margin-bottom: 32px; flex-wrap: wrap; justify-content: center; }
  .info-card {
    background: rgba(255,255,255,0.04);
    border: 1px solid rgba(255,255,255,0.08);
    border-radius: 10px;
    padding: 16px 22px;
    text-align: center;
    min-width: 110px;
  }
  .info-card .ic-label {
    font-size: 9px;
    font-weight: 700;
    letter-spacing: 0.16em;
    text-transform: uppercase;
    color: rgba(255,255,255,0.3);
    margin-bottom: 6px;
  }
  .info-card .ic-val { font-size: 18px; font-weight: 800; color: #4fc3f7; }
  .hint { font-size: 11px; color: rgba(255,255,255,0.28); letter-spacing: 0.08em; margin-top: 8px; text-align: center; line-height: 1.7; }
  .sens-control { display: flex; flex-direction: column; align-items: center; gap: 8px; margin-bottom: 22px; }
  .sens-label { font-size: 10px; font-weight: 700; letter-spacing: 0.16em; text-transform: uppercase; color: rgba(255,255,255,0.35); }
  .sens-slider { width: 220px; accent-color: #4fc3f7; cursor: pointer; }
  .sens-value { font-size: 14px; font-weight: 800; color: #4fc3f7; font-variant-numeric: tabular-nums; }
  #pause-screen .pause-stats {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 10px;
    margin-bottom: 36px;
  }
  .pause-stat {
    background: rgba(255,255,255,0.04);
    border: 1px solid rgba(255,255,255,0.08);
    border-radius: 8px;
    padding: 12px 20px;
    text-align: center;
  }
  .pause-stat .ps-label {
    font-size: 9px;
    font-weight: 700;
    letter-spacing: 0.14em;
    text-transform: uppercase;
    color: rgba(255,255,255,0.3);
    margin-bottom: 4px;
  }
  .pause-stat .ps-val { font-size: 22px; font-weight: 800; color: #ffffff; }
  #muzzle-overlay {
    position: fixed;
    top: 0; left: 0;
    width: 100vw; height: 100vh;
    background: radial-gradient(ellipse at 50% 80%, rgba(255,200,80,0.12) 0%, transparent 60%);
    pointer-events: none;
    opacity: 0;
    z-index: 8;
    transition: opacity 0.04s;
  }
  #muzzle-overlay.flash { opacity: 1; }
  /* â”€â”€ Sniper Scope â”€â”€ */
  #scope-overlay {
    position: absolute; top: 0; left: 0; width: 100%; height: 100%;
    display: none; pointer-events: none; z-index: 1;
    background: radial-gradient(circle at 50% 50%, transparent 0, transparent 33.6vmin, rgba(0,0,0,0.55) 34vmin, #000 35vmin);
  }
  #scope-overlay.active { display: block; }
  .scope-ring {
    position: absolute; top: 50%; left: 50%;
    width: 68.4vmin; height: 68.4vmin; transform: translate(-50%, -50%);
    border-radius: 50%; border: 3px solid #000;
    box-shadow: inset 0 0 40px rgba(0,0,0,0.55);
  }
  .sl-h, .sl-v { position: absolute; background: rgba(0,0,0,0.88); }
  .sl-h { top: 50%; left: calc(50% - 34vmin); width: 68vmin; height: 1px; }
  .sl-v { left: 50%; top: calc(50% - 34vmin); height: 68vmin; width: 1px; }
  .sl-gap {
    position: absolute; top: 50%; left: 50%; width: 5vmin; height: 5vmin;
    transform: translate(-50%, -50%); border-radius: 50%;
    background: rgba(26,26,30,0.0); box-shadow: 0 0 0 1px rgba(0,0,0,0);
  }
  .sl-dot { position: absolute; top: 50%; left: 50%; width: 4px; height: 4px; transform: translate(-50%, -50%); background: #ff3b3b; border-radius: 50%; }
  .sl-zoom {
    position: absolute; left: 50%; top: calc(50% + 31vmin); transform: translateX(-50%);
    font-size: 11px; font-weight: 700; letter-spacing: 0.2em; color: rgba(255,255,255,0.45);
  }
  /* â”€â”€ Weapon HUD â”€â”€ */
  #weapon-hud {
    position: absolute; right: 18px; bottom: 22px;
    display: flex; flex-direction: column; gap: 6px; align-items: flex-end; z-index: 3;
  }
  .wslot {
    position: relative; overflow: hidden;
    display: flex; align-items: center; gap: 10px; min-width: 190px;
    padding: 8px 12px 10px; border-radius: 6px;
    background: rgba(0,0,0,0.45); border: 1px solid rgba(255,255,255,0.08);
    color: rgba(255,255,255,0.4); font-size: 11px; font-weight: 700;
    letter-spacing: 0.1em; text-transform: uppercase;
    transition: all 0.12s;
  }
  .wslot .wkey {
    width: 18px; height: 18px; border-radius: 4px; display: flex; align-items: center; justify-content: center;
    background: rgba(255,255,255,0.08); font-size: 10px;
  }
  .wslot .wname { flex: 1; }
  .wslot .wtag { font-size: 9px; opacity: 0.7; letter-spacing: 0.12em; }
  .wslot.active { color: #fff; border-color: #4fc3f7; background: rgba(79,195,247,0.16); transform: translateX(-6px); }
  .wslot.active .wkey { background: #4fc3f7; color: #04121c; }
  .wbar { position: absolute; left: 0; bottom: 0; width: 100%; height: 3px; background: rgba(255,255,255,0.06); }
  .wbar-fill { width: 100%; height: 100%; background: #4fc3f7; transform-origin: left; transform: scaleX(1); }
  #scope-hint {
    position: absolute; right: 18px; bottom: 150px; font-size: 10px; letter-spacing: 0.12em;
    text-transform: uppercase; color: rgba(255,255,255,0.35); text-align: right; z-index: 3; line-height: 1.7;
  }
  /* â”€â”€ Challenge Mode â”€â”€ */
  .mode-tabs { display: flex; gap: 10px; margin-bottom: 22px; }
  .mode-tab {
    flex: 1; padding: 10px 0; border-radius: 8px; cursor: pointer;
    font-size: 12px; font-weight: 700; letter-spacing: 0.12em; text-transform: uppercase;
    border: 1px solid rgba(255,255,255,0.12);
    background: rgba(255,255,255,0.05); color: rgba(255,255,255,0.55);
    transition: all 0.15s;
  }
  .mode-tab.active {
    background: linear-gradient(135deg, #4fc3f7 0%, #0288d1 100%);
    color: #fff; border-color: transparent;
    box-shadow: 0 4px 18px rgba(79,195,247,0.28);
  }
  #challenge-options { display: none; flex-direction: column; align-items: center; gap: 10px; margin-bottom: 22px; }
  #challenge-options.visible { display: flex; }
  .dur-grid { display: flex; gap: 8px; flex-wrap: wrap; justify-content: center; }
  .dur-btn {
    padding: 8px 18px; border-radius: 8px; cursor: pointer;
    font-size: 12px; font-weight: 700; letter-spacing: 0.1em;
    border: 1px solid rgba(255,255,255,0.12);
    background: rgba(255,255,255,0.06); color: rgba(255,255,255,0.65);
    transition: all 0.15s;
  }
  .dur-btn.selected {
    background: rgba(79,195,247,0.18); color: #4fc3f7; border-color: #4fc3f7;
  }
  #timer-panel.challenge-mode #timer-label { color: #ff9800; }
  #timer-panel.challenge-mode #timer-value { color: #ff9800; }
  #timer-panel.challenge-mode.urgent #timer-value { color: #ff4444; animation: pulse-red 0.5s ease-in-out infinite; }
  @keyframes pulse-red { 0%,100% { opacity:1; } 50% { opacity:0.55; } }
  /* â”€â”€ Result Popup â”€â”€ */
  #result-popup {
    position: fixed; top: 0; left: 0; width: 100vw; height: 100vh;
    display: flex; align-items: center; justify-content: center;
    z-index: 200; pointer-events: auto;
    background: rgba(0,0,0,0.72); backdrop-filter: blur(14px);
    opacity: 0; transition: opacity 0.25s ease;
  }
  #result-popup.visible { opacity: 1; }
  #result-popup.hidden { display: none; }
  .rp-card {
    background: #0d1117; border: 1px solid rgba(79,195,247,0.35);
    border-radius: 20px; padding: 2rem 2.2rem;
    width: min(480px, 90vw); text-align: center;
    box-shadow: 0 0 60px rgba(79,195,247,0.12);
    transform: scale(0.9); transition: transform 0.28s cubic-bezier(.34,1.56,.64,1);
  }
  #result-popup.visible .rp-card { transform: scale(1); }
  .rp-badge {
    display: inline-block; padding: 4px 14px; border-radius: 20px;
    font-size: 10px; font-weight: 800; letter-spacing: 0.18em; text-transform: uppercase;
    background: rgba(79,195,247,0.15); color: #4fc3f7; margin-bottom: 10px;
  }
  .rp-title { font-size: 28px; font-weight: 900; color: #fff; margin-bottom: 6px; letter-spacing: -0.5px; }
  .rp-sub { font-size: 12px; color: rgba(255,255,255,0.35); letter-spacing: 0.1em; text-transform: uppercase; margin-bottom: 24px; }
  .rp-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 10px; margin-bottom: 24px; }
  .rp-stat {
    background: rgba(255,255,255,0.05); border: 1px solid rgba(255,255,255,0.08);
    border-radius: 12px; padding: 14px 10px;
  }
  .rp-stat-label { font-size: 9px; font-weight: 700; letter-spacing: 0.16em; text-transform: uppercase; color: rgba(255,255,255,0.3); margin-bottom: 6px; }
  .rp-stat-val { font-size: 26px; font-weight: 800; }
  .rp-stat-val.hits { color: #69f0ae; }
  .rp-stat-val.misses { color: #ff5252; }
  .rp-stat-val.score { color: #4fc3f7; }
  .rp-stat-val.acc { color: #ffb300; }
  .rp-btns { display: flex; gap: 10px; }
  .rp-btn-primary {
    flex: 1; padding: 13px 0; border-radius: 8px;
    background: linear-gradient(135deg, #4fc3f7 0%, #0288d1 100%);
    color: #fff; border: none; font-size: 12px; font-weight: 700;
    letter-spacing: 0.12em; text-transform: uppercase; cursor: pointer;
    transition: opacity 0.15s, transform 0.12s;
    box-shadow: 0 4px 18px rgba(79,195,247,0.25);
  }
  .rp-btn-primary:hover { opacity: 0.9; transform: translateY(-1px); }
  .rp-btn-secondary {
    flex: 1; padding: 13px 0; border-radius: 8px;
    background: rgba(255,255,255,0.06); color: rgba(255,255,255,0.7);
    border: 1px solid rgba(255,255,255,0.1); font-size: 12px; font-weight: 700;
    letter-spacing: 0.12em; text-transform: uppercase; cursor: pointer;
    transition: background 0.15s;
  }
  .rp-btn-secondary:hover { background: rgba(255,255,255,0.12); }
  /* â”€â”€ Mobile / cross-browser â”€â”€ */
  html, body { overscroll-behavior: none; -webkit-tap-highlight-color: transparent; -webkit-touch-callout: none; touch-action: manipulation; }
  #canvas, #hud, .screen, #result-popup { height: 100vh; height: 100dvh; }
  .screen { -webkit-backdrop-filter: blur(12px); -webkit-overflow-scrolling: touch; padding-left: 12px; padding-right: 12px; }
  #result-popup { -webkit-backdrop-filter: blur(14px); }
  .stat-row, #timer-panel { -webkit-backdrop-filter: blur(6px); }
  #touch-ui { display: none; position: absolute; top: 0; left: 0; width: 100%; height: 100%; z-index: 2; touch-action: none; }
  body.touch #touch-ui { display: block; }
  #touch-look { position: absolute; top: 0; left: 0; width: 100%; height: 100%; pointer-events: auto; touch-action: none; }
  .tbtn {
    position: absolute; pointer-events: auto; touch-action: none; border-radius: 50%;
    border: 2px solid rgba(255,255,255,0.35); background: rgba(0,0,0,0.38); color: #fff;
    display: flex; align-items: center; justify-content: center;
    font-weight: 800; font-size: 11px; letter-spacing: 0.1em; text-transform: uppercase;
    -webkit-user-select: none; user-select: none;
  }
  .tbtn.down { background: rgba(79,195,247,0.45); border-color: #4fc3f7; }
  #t-fire { right: calc(22px + env(safe-area-inset-right, 0px)); bottom: calc(22px + env(safe-area-inset-bottom, 0px)); width: 92px; height: 92px; }
  #t-scope { display: none; left: calc(22px + env(safe-area-inset-left, 0px)); bottom: calc(22px + env(safe-area-inset-bottom, 0px)); width: 74px; height: 74px; }
  #t-scope.show { display: flex; }
  #t-pause { top: 56px; right: calc(14px + env(safe-area-inset-right, 0px)); width: 38px; height: 38px; font-size: 14px; letter-spacing: 0; }
  body.touch #fps, body.touch #scope-hint { display: none; }
  body.touch #weapon-hud { pointer-events: auto; right: calc(14px + env(safe-area-inset-right, 0px)); bottom: 128px; gap: 5px; }
  body.touch .wslot { min-width: 116px; padding: 9px 10px 11px; }
  body.touch .wslot .wtag { display: none; }
  body.touch .wslot.active { transform: translateX(-4px); }
  .hint-touch { display: none; }
  body.touch .hint-touch { display: block; }
  body.touch .hint-desktop { display: none; }
  #rotate-hint {
    display: none; position: fixed; top: 0; left: 0; width: 100%; padding: 7px 10px; text-align: center;
    font-size: 11px; font-weight: 700; letter-spacing: 0.08em; background: #0288d1; color: #fff;
    z-index: 300; pointer-events: none;
  }
  @media (orientation: portrait) { body.touch #rotate-hint { display: block; } }
  @media (max-width: 700px), (max-height: 520px) {
    .title { font-size: clamp(30px, 9vw, 48px) !important; margin-bottom: 4px; }
    .subtitle { margin-bottom: 16px; font-size: 11px; }
    .logo { margin-bottom: 8px; }
    .info-grid { display: none !important; }
    .btn-primary { padding: 13px 36px; }
    .sens-control { margin-bottom: 14px; }
    #stats { top: 40px; left: 10px; gap: 4px; transform-origin: top left; transform: scale(0.82); }
    #timer-panel { top: 8px; padding: 5px 14px; }
    #timer-value { font-size: 20px; }
    .rp-card { padding: 1.2rem; }
    .rp-title { font-size: 22px; }
    .rp-stat-val { font-size: 20px; }
    .pause-stats { margin-bottom: 14px !important; grid-template-columns: repeat(4, 1fr) !important; gap: 6px !important; }
    .pause-stat { padding: 8px 12px; }
    .pause-stat .ps-val { font-size: 18px; }
    #pause-screen .btn-primary, #pause-screen .btn-secondary { order: 5; margin-top: 0 !important; margin-bottom: 8px; padding-top: 10px; padding-bottom: 10px; }
    #pause-screen .sens-control, #pause-screen .ch-panel { order: 10; }
  }
</style>
</head>
<body>
<canvas id="canvas"></canvas>
<div id="rotate-hint">â†» Rotate your phone to landscape for the best experience</div>
<div id="hud">
  <div id="crosshair"></div>
  <div id="hitmarker"></div>
  <div id="muzzle-overlay"></div>
  <div id="scope-overlay">
    <div class="scope-ring"></div>
    <div class="sl-h"></div>
    <div class="sl-v"></div>
    <div class="sl-gap"></div>
    <div class="sl-dot"></div>
    <div class="sl-zoom">SNIPER Â· 4.4x</div>
  </div>
  <div id="stats">
    <div class="stat-row"><span class="stat-label">Score</span><span class="stat-value accent" id="s-score">0</span></div>
    <div class="stat-row"><span class="stat-label">Hits</span><span class="stat-value good" id="s-hits">0</span></div>
    <div class="stat-row"><span class="stat-label">Misses</span><span class="stat-value bad" id="s-misses">0</span></div>
    <div class="stat-row"><span class="stat-label">Accuracy</span><span class="stat-value" id="s-acc">-</span></div>
  </div>
  <div id="timer-panel">
    <div id="timer-label">Session Time</div>
    <div id="timer-value">0:00</div>
  </div>
  <div id="touch-ui">
    <div id="touch-look"></div>
    <div class="tbtn" id="t-fire">Fire</div>
    <div class="tbtn" id="t-scope">Scope</div>
    <div class="tbtn" id="t-pause">âšâš</div>
  </div>
  <div id="fps">60 FPS</div>
  <div id="scope-hint">Right click = Scope (Sniper)<br>Hold left click = Auto fire</div>
  <div id="weapon-hud">
    <div class="wslot active" id="ws-pistol"><span class="wkey">1</span><span class="wname">Pistol</span><span class="wtag">Semi</span><div class="wbar"><div class="wbar-fill" id="wf-pistol"></div></div></div>
    <div class="wslot" id="ws-sniper"><span class="wkey">2</span><span class="wname">Sniper</span><span class="wtag">Bolt Â· Scope</span><div class="wbar"><div class="wbar-fill" id="wf-sniper"></div></div></div>
    <div class="wslot" id="ws-auto"><span class="wkey">3</span><span class="wname">Auto Rifle</span><span class="wtag">Full Auto</span><div class="wbar"><div class="wbar-fill" id="wf-auto"></div></div></div>
  </div>
</div>
<div class="screen" id="start-screen">
  <div class="logo">Aim Trainer Pro</div>
  <div class="title">SHARPEN YOUR <span>AIM</span></div>
  <div class="subtitle">First-Person Precision Training</div>
  <div class="mode-tabs">
    <button class="mode-tab active" id="tab-infinite">âˆž Infinite</button>
    <button class="mode-tab" id="tab-challenge">â± Challenge</button>
  </div>
  <div id="challenge-options">
    <div style="font-size:11px;color:rgba(255,255,255,0.35);letter-spacing:0.1em;text-transform:uppercase;margin-bottom:4px;">Select Duration</div>
    <div class="dur-grid">
      <button class="dur-btn selected" data-dur="10">10s</button>
      <button class="dur-btn" data-dur="20">20s</button>
      <button class="dur-btn" data-dur="30">30s</button>
      <button class="dur-btn" data-dur="60">60s</button>
      <button class="dur-btn" data-dur="100">100s</button>
    </div>
  </div>
  <div class="info-grid" id="info-grid-infinite">
    <div class="info-card"><div class="ic-label">Mode</div><div class="ic-val" style="font-size:13px;color:#fff;">Infinite</div></div>
    <div class="info-card"><div class="ic-label">Targets</div><div class="ic-val">âˆž</div></div>
    <div class="info-card"><div class="ic-label">Spawn</div><div class="ic-val" style="font-size:13px;">50ms</div></div>
    <div class="info-card"><div class="ic-label">Ammo</div><div class="ic-val" style="font-size:13px;color:#cbd5e1;padding-top:2px;">âˆž</div></div>
    <div class="info-card"><div class="ic-label">Weapons</div><div class="ic-val" style="font-size:13px;">3</div></div>
  </div>
  <div class="sens-control">
      <div class="sens-label">Sensitivity</div>
      <input type="range" min="0.1" max="5.0" step="0.1" value="1.0" class="sens-slider" id="sens-slider-start">
      <div class="sens-value" id="sens-val-start">1.0x</div>
    </div>
  <details class="ch-panel"><summary>âŒ– Crosshair Settings</summary><div class="ch-body" data-ch-ui></div></details>
    <button class="btn-primary" id="btn-start">â–¶ Start Training</button>
  <div class="hint hint-desktop">ESC pause Â· Left click shoot Â· 1 / 2 / 3 or Scroll = switch weapon<br>Right click = Sniper scope Â· Hold left click = Auto rifle</div>
  <div class="hint hint-touch">Drag anywhere to aim Â· FIRE button to shoot (hold for auto)<br>Tap a weapon to switch Â· SCOPE button for sniper Â· âšâš to pause</div>
</div>
<div id="result-popup" class="hidden">
  <div class="rp-card">
    <div class="rp-badge">Challenge Complete</div>
    <div class="rp-title" id="rp-title">Great Shot!</div>
    <div class="rp-sub" id="rp-sub">30 Second Challenge</div>
    <div class="rp-grid">
      <div class="rp-stat"><div class="rp-stat-label">Hits</div><div class="rp-stat-val hits" id="rp-hits">0</div></div>
      <div class="rp-stat"><div class="rp-stat-label">Misses</div><div class="rp-stat-val misses" id="rp-misses">0</div></div>
      <div class="rp-stat"><div class="rp-stat-label">Score</div><div class="rp-stat-val score" id="rp-score">0</div></div>
      <div class="rp-stat"><div class="rp-stat-label">Accuracy</div><div class="rp-stat-val acc" id="rp-acc">-</div></div>
    </div>
    <div class="rp-btns">
      <button class="rp-btn-primary" id="rp-play-again">â–¶ Play Again</button>
      <button class="rp-btn-secondary" id="rp-menu">â†© Menu</button>
    </div>
  </div>
</div>
<div class="screen hidden" id="pause-screen">
  <div class="logo">Paused</div>
  <div class="title" style="font-size:42px;margin-bottom:24px;">TRAINING PAUSED</div>
  <div class="pause-stats">
    <div class="pause-stat"><div class="ps-label">Score</div><div class="ps-val" id="p-score">0</div></div>
    <div class="pause-stat"><div class="ps-label">Hits</div><div class="ps-val" id="p-hits">0</div></div>
    <div class="pause-stat"><div class="ps-label">Misses</div><div class="ps-val" id="p-misses">0</div></div>
    <div class="pause-stat"><div class="ps-label">Accuracy</div><div class="ps-val" id="p-acc">-</div></div>
  </div>
  <div class="sens-control" style="margin-bottom: 24px;">
      <div class="sens-label">Sensitivity</div>
      <input type="range" min="0.1" max="5.0" step="0.1" value="1.0" class="sens-slider" id="sens-slider-pause">
      <div class="sens-value" id="sens-val-pause">1.0x</div>
    </div>
  <details class="ch-panel"><summary>âŒ– Crosshair Settings</summary><div class="ch-body" data-ch-ui></div></details>
    <button class="btn-primary" id="btn-resume">â–¶ Resume</button>
  <button class="btn-secondary" id="btn-restart">Restart</button>
  <button class="btn-secondary" id="btn-pause-menu" style="margin-top: 14px;">â†© Menu</button>
</div>
<script src="https://cdnjs.cloudflare.com/ajax/libs/three.js/r128/three.min.js"></script>
<script>
"use strict";
const IS_TOUCH = !!(window.matchMedia && window.matchMedia('(pointer: coarse)').matches);
if (IS_TOUCH) document.body.classList.add('touch');
const AudioCtx = window.AudioContext || window.webkitAudioContext;
let audioCtx = null;
let noiseBuf = null;
function ensureAudio() {
  try {
    if (!audioCtx) audioCtx = new AudioCtx();
    if (audioCtx.state === 'suspended') {
      const p = audioCtx.resume();
      if (p && p.catch) p.catch(e => console.warn("Audio resume blocked", e));
    }
  } catch (err) {
    console.warn("Audio init failed", err);
  }
}
function getNoise() {
  if (!noiseBuf) {
    noiseBuf = audioCtx.createBuffer(1, Math.floor(audioCtx.sampleRate * 0.5), audioCtx.sampleRate);
    const d = noiseBuf.getChannelData(0);
    for (let i = 0; i < d.length; i++) d[i] = (Math.random() * 2 - 1);
  }
  return noiseBuf;
}
const GUN_SND = {
  pistol: { len: 0.12, gain: 1.2, ftype: 'bandpass', freq: 420, q: 0.6, oF0: 140, oF1: 40, oLen: 0.10, oGain: 0.8 },
  sniper: { len: 0.45, gain: 1.9, ftype: 'lowpass', freq: 900, q: 0.7, oF0: 110, oF1: 28, oLen: 0.40, oGain: 1.1 },
  auto:   { len: 0.07, gain: 0.9, ftype: 'bandpass', freq: 650, q: 0.7, oF0: 190, oF1: 60, oLen: 0.06, oGain: 0.6 }
};
function playClick(at, freq) {
  if (!audioCtx) return;
  const o = audioCtx.createOscillator();
  const g = audioCtx.createGain();
  o.type = 'square';
  o.frequency.setValueAtTime(freq, at);
  g.gain.setValueAtTime(0.1, at);
  g.gain.exponentialRampToValueAtTime(0.001, at + 0.03);
  o.connect(g); g.connect(audioCtx.destination);
  o.start(at); o.stop(at + 0.04);
}
function playGunshot(type) {
  if (!audioCtx) return;
  const s = GUN_SND[type] || GUN_SND.pistol;
  const t = audioCtx.currentTime;
  const src = audioCtx.createBufferSource();
  src.buffer = getNoise();
  const gain = audioCtx.createGain();
  gain.gain.setValueAtTime(s.gain, t);
  gain.gain.exponentialRampToValueAtTime(0.001, t + s.len - 0.01);
  const filter = audioCtx.createBiquadFilter();
  filter.type = s.ftype;
  filter.frequency.value = s.freq;
  filter.Q.value = s.q;
  src.connect(filter); filter.connect(gain); gain.connect(audioCtx.destination);
  src.start(t); src.stop(t + s.len);
  const osc = audioCtx.createOscillator();
  const og = audioCtx.createGain();
  osc.type = 'sine';
  osc.frequency.setValueAtTime(s.oF0, t);
  osc.frequency.exponentialRampToValueAtTime(s.oF1, t + s.oLen);
  og.gain.setValueAtTime(s.oGain, t);
  og.gain.exponentialRampToValueAtTime(0.001, t + s.oLen);
  osc.connect(og); og.connect(audioCtx.destination);
  osc.start(t); osc.stop(t + s.oLen);
  if (type === 'sniper') {
    // sharp supersonic crack + bolt-action clicks
    const crack = audioCtx.createBufferSource();
    crack.buffer = getNoise();
    const cg = audioCtx.createGain();
    cg.gain.setValueAtTime(0.9, t);
    cg.gain.exponentialRampToValueAtTime(0.001, t + 0.06);
    const hp = audioCtx.createBiquadFilter();
    hp.type = 'highpass'; hp.frequency.value = 2500;
    crack.connect(hp); hp.connect(cg); cg.connect(audioCtx.destination);
    crack.start(t); crack.stop(t + 0.07);
    playClick(t + 0.5, 1800);
    playClick(t + 0.63, 1200);
  }
}
function playSwitch() {
  if (!audioCtx) return;
  const t = audioCtx.currentTime;
  playClick(t, 900);
  playClick(t + 0.07, 1300);
}
function playHit() {
  if (!audioCtx) return;
  const t = audioCtx.currentTime;
  const osc = audioCtx.createOscillator();
  const g = audioCtx.createGain();
  osc.type = 'triangle';
  osc.frequency.setValueAtTime(900, t);
  osc.frequency.exponentialRampToValueAtTime(400, t + 0.06);
  g.gain.setValueAtTime(0.35, t);
  g.gain.exponentialRampToValueAtTime(0.001, t + 0.06);
  osc.connect(g); g.connect(audioCtx.destination);
  osc.start(t); osc.stop(t + 0.07);
}
function playDestroy() {
  if (!audioCtx) return;
  const t = audioCtx.currentTime;
  [600, 800, 1100].forEach((freq, i) => {
    const o = audioCtx.createOscillator();
    const g = audioCtx.createGain();
    o.type = 'sine';
    o.frequency.setValueAtTime(freq, t + i * 0.018);
    g.gain.setValueAtTime(0.22, t + i * 0.018);
    g.gain.exponentialRampToValueAtTime(0.001, t + i * 0.018 + 0.08);
    o.connect(g); g.connect(audioCtx.destination);
    o.start(t + i * 0.018); o.stop(t + i * 0.018 + 0.09);
  });
}
const state = { running: false, paused: false, hits: 0, misses: 0, score: 0, startTime: 0, pauseAccum: 0, pauseStart: 0 };
function resetState() { state.running=false; state.paused=false; state.hits=0; state.misses=0; state.score=0; state.startTime=0; state.pauseAccum=0; state.pauseStart=0; }
// â”€â”€ Challenge Mode State â”€â”€
const challenge = { active: false, duration: 10, remaining: 10 };
let selectedDuration = 10;
let isChallengeMode = false;
const canvas = document.getElementById('canvas');
let renderer;
try {
  renderer = new THREE.WebGLRenderer({ canvas, antialias: true, powerPreference: 'high-performance' });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, IS_TOUCH ? 1.5 : 2));
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.shadowMap.enabled = false;
  renderer.setClearColor(0x1a1a1e, 1);
  canvas.addEventListener("webglcontextlost", (e) => { 
    e.preventDefault(); 
    if (state.running) pauseGame(); 
  }, false);
} catch (e) {
  console.error("WebGL failed to init", e);
  document.getElementById('start-screen').innerHTML = '<div style="color:#ff5252;padding:20px;text-align:center;max-width:400px;margin:0 auto;line-height:1.5;">WebGL is not supported or failed to initialize on your device. Please ensure hardware acceleration is enabled in your browser settings.</div>';
}
const BASE_FOV = 75;
const SCOPE_FOV = 17;
const scene = new THREE.Scene();
scene.fog = new THREE.Fog(0x1a1a1e, 18, 38);
const camera = new THREE.PerspectiveCamera(BASE_FOV, window.innerWidth / window.innerHeight, 0.01, 80);
camera.position.set(0, 1.65, 0);
const euler = new THREE.Euler(0, 0, 0, 'YXZ');
const PI_2 = Math.PI / 2;
const baseLookSensitivity = 0.0018;
let userSensMultiplier = parseFloat(localStorage.getItem('aimTrainerSens')) || 1.0;
function applyMouseMove(dx, dy) {
  // scale sensitivity with zoom so scoped movement stays consistent
  const finalSens = baseLookSensitivity * userSensMultiplier * (camera.fov / BASE_FOV);
  euler.setFromQuaternion(camera.quaternion);
  euler.y -= dx * finalSens;
  euler.x -= dy * finalSens;
  euler.x = Math.max(-PI_2 * 0.88, Math.min(PI_2 * 0.88, euler.x));
  camera.quaternion.setFromEuler(euler);
}
const setupSensUI = (idBase) => {
    const slider = document.getElementById('sens-slider-' + idBase);
    const valText = document.getElementById('sens-val-' + idBase);
    if (slider && valText) {
      slider.value = userSensMultiplier;
      valText.textContent = userSensMultiplier.toFixed(1) + 'x';
      slider.addEventListener('input', (e) => {
        userSensMultiplier = parseFloat(e.target.value);
        valText.textContent = userSensMultiplier.toFixed(1) + 'x';
        localStorage.setItem('aimTrainerSens', userSensMultiplier);
        const otherBase = idBase === 'start' ? 'pause' : 'start';
        const otherSlider = document.getElementById('sens-slider-' + otherBase);
        const otherVal = document.getElementById('sens-val-' + otherBase);
        if (otherSlider && otherVal) {
          otherSlider.value = userSensMultiplier;
          otherVal.textContent = userSensMultiplier.toFixed(1) + 'x';
        }
      });
    }
  };
  setupSensUI('start');
  setupSensUI('pause');

// â•â•â•â•â•â•â•â•â•â•â•â•â•â•â• CROSSHAIR CUSTOMIZER â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•
const CH_DEFAULT = { style: 'cross', color: '#ffffff', size: 24, thickness: 2, gap: 3, outline: true };
const CH_STYLES = [['cross','Cross'],['crossdot','Cross + Dot'],['dot','Dot'],['circle','Circle'],['circledot','Circle + Dot'],['tshape','T-Shape']];
const CH_COLORS = ['#ffffff','#00ff66','#ffee00','#00e5ff','#ff3b3b','#ff4dff'];
let ch = Object.assign({}, CH_DEFAULT);
try {
  const sv = JSON.parse(localStorage.getItem('aimTrainerCrosshair') || 'null');
  if (sv && typeof sv === 'object') ch = Object.assign({}, CH_DEFAULT, sv);
} catch (e) {}
function saveCH() { try { localStorage.setItem('aimTrainerCrosshair', JSON.stringify(ch)); } catch (e) {} }
function crosshairSVG(c) {
  const S = c.size, h = S / 2, t = c.thickness;
  const g = Math.min(c.gap, h - 2);
  const arm = Math.max(1, h - g);
  const hasArms = c.style === 'cross' || c.style === 'crossdot' || c.style === 'tshape';
  const hasDot = c.style === 'crossdot' || c.style === 'dot' || c.style === 'circledot';
  const hasRing = c.style === 'circle' || c.style === 'circledot';
  function pass(pad, col) {
    let s = '';
    const r = function (x, y, w, hh) {
      return '<rect x="' + (x - pad) + '" y="' + (y - pad) + '" width="' + (w + pad * 2) + '" height="' + (hh + pad * 2) + '" fill="' + col + '"/>';
    };
    if (hasArms) {
      if (c.style !== 'tshape') s += r(h - t / 2, 0, t, arm);
      s += r(h - t / 2, h + g, t, arm);
      s += r(0, h - t / 2, arm, t);
      s += r(h + g, h - t / 2, arm, t);
    }
    if (hasRing) {
      const rr = Math.max(1, h - 1 - t / 2);
      s += '<circle cx="' + h + '" cy="' + h + '" r="' + rr + '" fill="none" stroke="' + col + '" stroke-width="' + (t + pad * 2) + '"/>';
    }
    if (hasDot) s += '<circle cx="' + h + '" cy="' + h + '" r="' + (Math.max(1, t * 0.75) + pad) + '" fill="' + col + '"/>';
    return s;
  }
  return '<svg xmlns="http://www.w3.org/2000/svg" width="' + S + '" height="' + S + '" viewBox="0 0 ' + S + ' ' + S + '">' +
    (c.outline ? pass(1, '#000000') : '') + pass(0, c.color) + '</svg>';
}
function applyCrosshair() {
  const el = document.getElementById('crosshair');
  el.style.width = ch.size + 'px';
  el.style.height = ch.size + 'px';
  el.innerHTML = crosshairSVG(ch);
  document.querySelectorAll('.ch-preview').forEach(function (p) { p.innerHTML = crosshairSVG(ch); });
}
function syncCH() {
  document.querySelectorAll('[data-ch-ui]').forEach(function (root) {
    root.querySelectorAll('[data-k]').forEach(function (inp) {
      const v = ch[inp.getAttribute('data-k')];
      if (inp.type === 'checkbox') inp.checked = !!v;
      else if (inp.value !== String(v)) inp.value = v;
    });
    root.querySelectorAll('[data-v]').forEach(function (s) { s.textContent = ch[s.getAttribute('data-v')]; });
  });
  applyCrosshair();
}
function buildCrosshairUI(root) {
  let html = '<div class="ch-preview"></div>';
  html += '<div class="ch-row"><label>Style</label><select data-k="style">' +
    CH_STYLES.map(function (s) { return '<option value="' + s[0] + '">' + s[1] + '</option>'; }).join('') + '</select></div>';
  html += '<div class="ch-row"><label>Color</label><input type="color" data-k="color"><div class="ch-swatches">' +
    CH_COLORS.map(function (c) { return '<button type="button" class="ch-sw" data-sw="' + c + '" style="background:' + c + '"></button>'; }).join('') + '</div></div>';
  [['size','Size',8,60],['thickness','Thickness',1,8],['gap','Gap',0,16]].forEach(function (d) {
    html += '<div class="ch-row"><label>' + d[1] + '</label><input type="range" data-k="' + d[0] + '" min="' + d[2] + '" max="' + d[3] + '" step="1"><span class="ch-val" data-v="' + d[0] + '"></span></div>';
  });
  html += '<div class="ch-row"><label>Outline</label><input type="checkbox" data-k="outline"></div>';
  html += '<button type="button" class="ch-reset">Reset</button>';
  root.innerHTML = html;
  root.querySelectorAll('[data-k]').forEach(function (inp) {
    const evt = (inp.tagName === 'SELECT' || inp.type === 'checkbox') ? 'change' : 'input';
    inp.addEventListener(evt, function () {
      const k = inp.getAttribute('data-k');
      ch[k] = inp.type === 'checkbox' ? inp.checked : (inp.type === 'range' ? parseInt(inp.value, 10) : inp.value);
      saveCH(); syncCH();
    });
  });
  root.querySelectorAll('.ch-sw').forEach(function (b) {
    b.addEventListener('click', function () { ch.color = b.getAttribute('data-sw'); saveCH(); syncCH(); });
  });
  root.querySelector('.ch-reset').addEventListener('click', function () {
    ch = Object.assign({}, CH_DEFAULT); saveCH(); syncCH();
  });
}
document.querySelectorAll('[data-ch-ui]').forEach(buildCrosshairUI);
syncCH();

  window.addEventListener('resize', () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  if (renderer) renderer.setSize(window.innerWidth, window.innerHeight);
});
const roomMeshes = [];
(function buildRoom() {
  const wallMat = new THREE.MeshLambertMaterial({ color: 0x2e2e35 });
  const floorMat = new THREE.MeshLambertMaterial({ color: 0x252528 });
  const ceilMat = new THREE.MeshLambertMaterial({ color: 0x202023 });
  const W = 22, H = 6, D = 32;
  const floor = new THREE.Mesh(new THREE.PlaneGeometry(W, D), floorMat);
  floor.rotation.x = -Math.PI / 2; floor.position.set(0, 0, -D/2 + 2); scene.add(floor); roomMeshes.push(floor);
  const ceil = new THREE.Mesh(new THREE.PlaneGeometry(W, D), ceilMat);
  ceil.rotation.x = Math.PI / 2; ceil.position.set(0, H, -D/2 + 2); scene.add(ceil); roomMeshes.push(ceil);
  const bwall = new THREE.Mesh(new THREE.PlaneGeometry(W, H), wallMat);
  bwall.position.set(0, H/2, -D + 2); scene.add(bwall); roomMeshes.push(bwall);
  const lwall = new THREE.Mesh(new THREE.PlaneGeometry(D, H), wallMat);
  lwall.rotation.y = Math.PI / 2; lwall.position.set(-W/2, H/2, -D/2 + 2); scene.add(lwall); roomMeshes.push(lwall);
  const rwall = new THREE.Mesh(new THREE.PlaneGeometry(D, H), wallMat);
  rwall.rotation.y = -Math.PI / 2; rwall.position.set(W/2, H/2, -D/2 + 2); scene.add(rwall); roomMeshes.push(rwall);
  const gridHelper = new THREE.GridHelper(W, 22, 0x333338, 0x2a2a30);
  gridHelper.position.set(0, 0.002, -D/2 + 2); scene.add(gridHelper);
  const markerMat = new THREE.MeshBasicMaterial({ color: 0x3a3a45 });
  for (let i = 0; i < 3; i++) {
    const m = new THREE.Mesh(new THREE.PlaneGeometry(5, 3.5), markerMat);
    m.position.set((i - 1) * 6, 2.5, -D + 2.01); scene.add(m);
  }
  const baseMat = new THREE.MeshBasicMaterial({ color: 0x1a1a1f });
  const baseboard = new THREE.Mesh(new THREE.BoxGeometry(W, 0.12, 0.06), baseMat);
  baseboard.position.set(0, 0.06, -D + 2.04); scene.add(baseboard);
  const lightMat = new THREE.MeshBasicMaterial({ color: 0xfff8e8 });
  const lightGeom = new THREE.PlaneGeometry(0.8, 3);
  [-6, 0, 6].forEach(x => {
    [-4, -14, -24].forEach(z => {
      const l = new THREE.Mesh(lightGeom, lightMat);
      l.rotation.x = Math.PI / 2; l.position.set(x, H - 0.01, z); scene.add(l);
    });
  });
})();
const ambient = new THREE.AmbientLight(0xffffff, 0.55); scene.add(ambient);
const dirLight = new THREE.DirectionalLight(0xfff8f0, 0.9); dirLight.position.set(2, 8, 4); scene.add(dirLight);
const fillLight = new THREE.DirectionalLight(0xe8f0ff, 0.35); fillLight.position.set(-4, 3, -8); scene.add(fillLight);

// â•â•â•â•â•â•â•â•â•â•â•â•â•â•â• WEAPONS â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•
const WEAPON_ORDER = ['pistol', 'sniper', 'auto'];
const WEAPONS = {
  pistol: {
    label: 'Pistol', cooldown: 0.08, auto: false, spread: 0, kick: 0,
    recoilSpeed: 14, rotKick: 0.07, flash: 1,
    rest: new THREE.Vector3(0.14, -0.14, -0.32),
    recoilOff: new THREE.Vector3(0, 0.04, 0.04),
    muzzle: new THREE.Vector3(0.14, -0.13, -0.71)
  },
  sniper: {
    label: 'Sniper', cooldown: 0.95, auto: false, spread: 0.09, kick: 0.014,
    recoilSpeed: 4.5, rotKick: 0.12, flash: 1.9,
    rest: new THREE.Vector3(0.16, -0.17, -0.40),
    recoilOff: new THREE.Vector3(0, 0.03, 0.12),
    muzzle: new THREE.Vector3(0.16, -0.16, -1.4)
  },
  auto: {
    label: 'Auto Rifle', cooldown: 0.075, auto: true, spread: 0.008, kick: 0.004,
    recoilSpeed: 24, rotKick: 0.035, flash: 0.85,
    rest: new THREE.Vector3(0.15, -0.16, -0.36),
    recoilOff: new THREE.Vector3(0, 0.012, 0.05),
    muzzle: new THREE.Vector3(0.15, -0.15, -0.98)
  }
};
Object.keys(WEAPONS).forEach(k => { WEAPONS[k].recoilPos = WEAPONS[k].rest.clone().add(WEAPONS[k].recoilOff); });

const darkMetal = new THREE.MeshLambertMaterial({ color: 0x1c1c22 });
const metal = new THREE.MeshLambertMaterial({ color: 0x2a2a32 });
const gripMat = new THREE.MeshLambertMaterial({ color: 0x111116 });
const barrelMat = new THREE.MeshLambertMaterial({ color: 0x222228 });
const slideMat = new THREE.MeshLambertMaterial({ color: 0x1a1a20 });
const silver = new THREE.MeshLambertMaterial({ color: 0x6a6a72 });
const accentMat = new THREE.MeshBasicMaterial({ color: 0x2a8bb5 });
const lensMat = new THREE.MeshBasicMaterial({ color: 0x4fc3f7 });
const woodMat = new THREE.MeshLambertMaterial({ color: 0x2b2420 });

function addBox(g, w, h, d, mat, x, y, z, rx) {
  const m = new THREE.Mesh(new THREE.BoxGeometry(w, h, d), mat);
  m.position.set(x, y, z);
  if (rx) m.rotation.x = rx;
  g.add(m); return m;
}
function addCyl(g, r, len, mat, x, y, z, seg) {
  const m = new THREE.Mesh(new THREE.CylinderGeometry(r, r, len, seg || 10), mat);
  m.rotation.x = Math.PI / 2;
  m.position.set(x, y, z);
  g.add(m); return m;
}

function buildPistol(g) {
  addBox(g, 0.055, 0.065, 0.32, slideMat, 0, 0.01, -0.04);
  addBox(g, 0.055, 0.055, 0.24, metal, 0, -0.04, 0.0);
  const barrelM = new THREE.Mesh(new THREE.CylinderGeometry(0.013, 0.013, 0.34, 8), barrelMat);
  barrelM.rotation.x = Math.PI / 2; barrelM.position.set(0, 0.01, -0.21); g.add(barrelM);
  const ring = new THREE.Mesh(new THREE.TorusGeometry(0.015, 0.005, 6, 8), silver);
  ring.rotation.x = Math.PI / 2; ring.position.set(0, 0.01, -0.37); g.add(ring);
  const tgShape = new THREE.Shape();
  tgShape.moveTo(-0.018, 0); tgShape.lineTo(0.018, 0); tgShape.lineTo(0.018, -0.028); tgShape.lineTo(-0.018, -0.028); tgShape.lineTo(-0.018, 0);
  const tg = new THREE.Mesh(new THREE.ShapeGeometry(tgShape), darkMetal);
  tg.position.set(0, -0.01, 0.04); tg.rotation.x = -0.15; g.add(tg);
  addBox(g, 0.052, 0.13, 0.10, gripMat, 0, -0.105, 0.09, 0.12);
  addBox(g, 0.052, 0.022, 0.095, darkMetal, 0, -0.175, 0.09);
  addBox(g, 0.008, 0.012, 0.004, darkMetal, 0, 0.048, -0.35);
  addBox(g, 0.022, 0.010, 0.006, darkMetal, 0, 0.048, 0.12);
  addBox(g, 0.004, 0.008, 0.05, silver, 0.028, 0.04, -0.02);
}

function buildSniper(g) {
  // receiver + stock
  addBox(g, 0.05, 0.07, 0.34, darkMetal, 0, 0, 0);
  addBox(g, 0.046, 0.10, 0.30, woodMat, 0, -0.02, 0.32, -0.05);
  addBox(g, 0.04, 0.03, 0.14, woodMat, 0, 0.04, 0.30);
  addBox(g, 0.045, 0.12, 0.06, gripMat, 0, -0.095, 0.12, 0.25);
  addBox(g, 0.035, 0.07, 0.07, metal, 0, -0.07, 0.0);
  // long barrel + shroud + muzzle brake
  addCyl(g, 0.012, 0.8, barrelMat, 0, 0.01, -0.55, 8);
  addCyl(g, 0.017, 0.25, metal, 0, 0.01, -0.30, 8);
  addCyl(g, 0.02, 0.07, silver, 0, 0.01, -0.97, 8);
  // scope
  addCyl(g, 0.02, 0.26, darkMetal, 0, 0.08, -0.02, 12);
  addCyl(g, 0.028, 0.05, darkMetal, 0, 0.08, -0.17, 12);
  addCyl(g, 0.024, 0.05, darkMetal, 0, 0.08, 0.13, 12);
  addCyl(g, 0.022, 0.004, lensMat, 0, 0.08, -0.197, 12);
  addBox(g, 0.012, 0.03, 0.012, metal, 0, 0.05, -0.08);
  addBox(g, 0.012, 0.03, 0.012, metal, 0, 0.05, 0.06);
  // bolt handle
  const bolt = new THREE.Mesh(new THREE.CylinderGeometry(0.006, 0.006, 0.05, 6), silver);
  bolt.rotation.z = Math.PI / 2; bolt.position.set(0.04, 0.01, 0.08); g.add(bolt);
  const knob = new THREE.Mesh(new THREE.SphereGeometry(0.012, 8, 6), silver);
  knob.position.set(0.068, 0.01, 0.08); g.add(knob);
}

function buildAuto(g) {
  addBox(g, 0.055, 0.075, 0.32, darkMetal, 0, 0, 0);
  addBox(g, 0.03, 0.012, 0.30, metal, 0, 0.043, 0);
  addBox(g, 0.058, 0.058, 0.22, metal, 0, -0.005, -0.26);
  addBox(g, 0.056, 0.01, 0.10, accentMat, 0, 0.0, -0.28);
  addCyl(g, 0.011, 0.21, barrelMat, 0, 0.0, -0.475, 8);
  addCyl(g, 0.016, 0.05, silver, 0, 0.0, -0.60, 8);
  addBox(g, 0.006, 0.03, 0.006, darkMetal, 0, 0.056, -0.5);
  addBox(g, 0.02, 0.018, 0.008, darkMetal, 0, 0.055, 0.1);
  addBox(g, 0.04, 0.14, 0.06, gripMat, 0, -0.1, -0.04, 0.18);
  addBox(g, 0.045, 0.11, 0.05, gripMat, 0, -0.095, 0.1, 0.3);
  addBox(g, 0.05, 0.08, 0.22, slideMat, 0, -0.01, 0.27);
  addBox(g, 0.004, 0.008, 0.05, silver, 0.029, 0.03, 0.0);
}

const models = {};
['pistol', 'sniper', 'auto'].forEach(id => {
  const g = new THREE.Group();
  if (id === 'pistol') buildPistol(g);
  else if (id === 'sniper') buildSniper(g);
  else buildAuto(g);
  g.position.copy(WEAPONS[id].rest);
  g.rotation.y = 0.04;
  g.visible = (id === 'pistol');
  camera.add(g);
  models[id] = g;
});
scene.add(camera);

const muzzleFlashGeo = new THREE.SphereGeometry(0.025, 6, 4);
const muzzleFlashMat = new THREE.MeshBasicMaterial({ color: 0xffdd44, transparent: true, opacity: 0 });
const muzzleFlash = new THREE.Mesh(muzzleFlashGeo, muzzleFlashMat);
muzzleFlash.position.copy(WEAPONS.pistol.muzzle);
camera.add(muzzleFlash);
let muzzleTimer = 0;

// weapon state
let curWeapon = 'pistol';
let scoped = false;
let targetFov = BASE_FOV;
let mouseHeld = false;
let drawT = 1;
let kickRecover = 0;
const hudEl = document.getElementById('hud');
const scopeOverlay = document.getElementById('scope-overlay');

function refreshWeaponHUD() {
  const tScope = document.getElementById('t-scope');
  if (tScope) tScope.classList.toggle('show', curWeapon === 'sniper');
  WEAPON_ORDER.forEach(id => {
    const el = document.getElementById('ws-' + id);
    if (el) el.classList.toggle('active', id === curWeapon);
  });
  const hint = document.getElementById('scope-hint');
  if (hint) hint.style.opacity = curWeapon === 'sniper' || curWeapon === 'auto' ? '1' : '0';
  if (hint) hint.innerHTML = curWeapon === 'sniper' ? 'Right click = Scope' : curWeapon === 'auto' ? 'Hold left click = Auto fire' : '';
}
function updateScopeVisuals() {
  const showScope = scoped && camera.fov < 45;
  scopeOverlay.classList.toggle('active', showScope);
  hudEl.classList.toggle('scoped', showScope);
  models[curWeapon].visible = !showScope;
  muzzleFlash.visible = !showScope;
}
function setScoped(on, instant) {
  scoped = !!on && curWeapon === 'sniper';
  targetFov = scoped ? SCOPE_FOV : BASE_FOV;
  if (instant) { camera.fov = targetFov; camera.updateProjectionMatrix(); }
  updateScopeVisuals();
}
function setWeapon(id) {
  if (!WEAPONS[id] || id === curWeapon) return;
  setScoped(false, true);
  models[curWeapon].visible = false;
  models[curWeapon].position.copy(WEAPONS[curWeapon].rest);
  models[curWeapon].rotation.x = 0;
  curWeapon = id;
  const W = WEAPONS[id];
  models[id].visible = true;
  muzzleFlash.position.copy(W.muzzle);
  muzzleFlash.scale.setScalar(W.flash);
  recoilActive = false; recoilAnim = 0;
  drawT = 0;
  canShoot = false; shootCooldown = Math.max(shootCooldown, 0.25);
  mouseHeld = false;
  ensureAudio(); playSwitch();
  refreshWeaponHUD();
  updateScopeVisuals();
}
function cycleWeapon(dir) {
  const i = WEAPON_ORDER.indexOf(curWeapon);
  const n = (i + dir + WEAPON_ORDER.length) % WEAPON_ORDER.length;
  setWeapon(WEAPON_ORDER[n]);
}
function resetWeaponInput() {
  mouseHeld = false;
  setScoped(false, true);
  recoilActive = false; recoilAnim = 0;
  kickRecover = 0;
  const m = models[curWeapon];
  m.position.copy(WEAPONS[curWeapon].rest); m.rotation.x = 0;
  drawT = 1;
}
function updateDraw(dt) {
  if (drawT >= 1) return;
  drawT = Math.min(1, drawT + dt * 5);
  const e = 1 - Math.pow(1 - drawT, 3);
  const m = models[curWeapon];
  m.position.copy(WEAPONS[curWeapon].rest);
  m.position.y -= (1 - e) * 0.18;
  m.rotation.x = (1 - e) * 0.5;
  if (drawT >= 1) { m.position.copy(WEAPONS[curWeapon].rest); m.rotation.x = 0; }
}
function updateFov(dt) {
  if (Math.abs(camera.fov - targetFov) > 0.05) {
    camera.fov += (targetFov - camera.fov) * Math.min(1, dt * 16);
    if (Math.abs(camera.fov - targetFov) <= 0.05) camera.fov = targetFov;
    camera.updateProjectionMatrix();
    updateScopeVisuals();
  }
}
function applyKick(k) {
  if (!k) return;
  const a = k * (camera.fov / BASE_FOV);
  euler.setFromQuaternion(camera.quaternion);
  euler.x = Math.min(PI_2 * 0.88, euler.x + a);
  camera.quaternion.setFromEuler(euler);
  kickRecover += a;
}
function recoverKick(dt) {
  if (kickRecover <= 0.00001) { kickRecover = 0; return; }
  const r = kickRecover * (1 - Math.exp(-dt * 9));
  euler.setFromQuaternion(camera.quaternion);
  euler.x -= r;
  camera.quaternion.setFromEuler(euler);
  kickRecover -= r;
}
function updateWeaponBar() {
  const W = WEAPONS[curWeapon];
  const f = document.getElementById('wf-' + curWeapon);
  if (!f) return;
  if (W.cooldown < 0.3) { f.style.transform = 'scaleX(1)'; return; }
  const r = canShoot ? 1 : Math.max(0, Math.min(1, 1 - (shootCooldown / W.cooldown)));
  f.style.transform = 'scaleX(' + r.toFixed(3) + ')';
}

// â•â•â•â•â•â•â•â•â•â•â•â•â•â•â• TARGETS â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•
const TARGET_RADIUS = 0.28, TARGET_MIN_Z = -6, TARGET_MAX_Z = -26;
const TARGET_Y_MIN = 0.8, TARGET_Y_MAX = 3.8, TARGET_X_RANGE = 7.5;
const SPEED_BASE = 1.4, SPEED_RANGE = 2.2;
const DIR_CHANGE_MIN = 0.6, DIR_CHANGE_MAX = 1.8;
const targetGeo = new THREE.SphereGeometry(TARGET_RADIUS, 16, 12);
const targetCoreMat = new THREE.MeshLambertMaterial({ color: 0xff3333 });
const targetGlowMat = new THREE.MeshBasicMaterial({ color: 0xff6655, transparent: true, opacity: 0.18, side: THREE.BackSide });
const targetGlowGeo = new THREE.SphereGeometry(TARGET_RADIUS * 1.22, 14, 10);
let activeTarget = null, spawnTimeout = null, spawnLocked = false;
function spawnTarget() {
  if (!state.running || state.paused || spawnLocked) return;
  spawnLocked = true;
  const delay = 50 + Math.random() * 70;
  spawnTimeout = setTimeout(() => {
    if (!state.running || state.paused) { spawnLocked = false; return; }
    const mesh = new THREE.Mesh(targetGeo, targetCoreMat);
    const glow = new THREE.Mesh(targetGlowGeo, targetGlowMat);
    mesh.add(glow);
    const z = TARGET_MIN_Z + Math.random() * (TARGET_MAX_Z - TARGET_MIN_Z);
    const x = (Math.random() * 2 - 1) * TARGET_X_RANGE;
    const y = TARGET_Y_MIN + Math.random() * (TARGET_Y_MAX - TARGET_Y_MIN);
    mesh.position.set(x, y, z);
    const speed = SPEED_BASE + Math.random() * SPEED_RANGE;
    const angle = Math.random() * Math.PI * 2;
    mesh.userData = {
      vel: new THREE.Vector3(Math.cos(angle) * speed, Math.sin(angle) * speed * 0.6, 0),
      dirTimer: DIR_CHANGE_MIN + Math.random() * (DIR_CHANGE_MAX - DIR_CHANGE_MIN),
      age: 0
    };
    scene.add(mesh); activeTarget = mesh; spawnLocked = false;
  }, delay);
}
function destroyTarget(hit) {
  if (!activeTarget) return;
  scene.remove(activeTarget); activeTarget = null;
  if (hit) {
    playHit(); playDestroy();
    state.hits++; state.score += 100;
    updateHUD(); showHitMarker(); showScorePopup();
  }
  spawnTarget();
}
function updateTarget(dt) {
  if (!activeTarget) return;
  const u = activeTarget.userData;
  u.age += dt; u.dirTimer -= dt;
  if (u.dirTimer <= 0) {
    const angle = Math.random() * Math.PI * 2;
    const speed = SPEED_BASE + Math.random() * SPEED_RANGE;
    u.vel.set(Math.cos(angle) * speed, Math.sin(angle) * speed * 0.55, 0);
    u.dirTimer = DIR_CHANGE_MIN + Math.random() * (DIR_CHANGE_MAX - DIR_CHANGE_MIN);
  }
  const p = activeTarget.position;
  p.x += u.vel.x * dt; p.y += u.vel.y * dt;
  if (p.x > TARGET_X_RANGE) { p.x = TARGET_X_RANGE; u.vel.x *= -1; }
  if (p.x < -TARGET_X_RANGE) { p.x = -TARGET_X_RANGE; u.vel.x *= -1; }
  if (p.y > TARGET_Y_MAX) { p.y = TARGET_Y_MAX; u.vel.y *= -1; }
  if (p.y < TARGET_Y_MIN) { p.y = TARGET_Y_MIN; u.vel.y *= -1; }
  const pulse = 1 + 0.04 * Math.sin(u.age * 6);
  activeTarget.scale.setScalar(pulse);
}
const impactPool = [];
const POOL_SIZE = 8;
const impactGeo = new THREE.SphereGeometry(0.04, 4, 3);
const impactMat = new THREE.MeshBasicMaterial({ color: 0xff6644 });
for (let i = 0; i < POOL_SIZE; i++) {
  const m = new THREE.Mesh(impactGeo, impactMat);
  m.visible = false; m.userData = { life: 0, vel: new THREE.Vector3() };
  scene.add(m); impactPool.push(m);
}
let poolIdx = 0;
function spawnImpact(pos) {
  for (let i = 0; i < 5; i++) {
    const m = impactPool[poolIdx % POOL_SIZE]; poolIdx++;
    m.position.copy(pos);
    m.userData.vel.set((Math.random()-0.5)*3.5, Math.random()*3+1, (Math.random()-0.5)*3.5);
    m.userData.life = 0.35; m.visible = true; m.scale.setScalar(1);
  }
}
function updateImpacts(dt) {
  for (let i = 0; i < POOL_SIZE; i++) {
    const m = impactPool[i];
    if (!m.visible) continue;
    m.userData.life -= dt;
    if (m.userData.life <= 0) { m.visible = false; continue; }
    m.position.addScaledVector(m.userData.vel, dt);
    m.userData.vel.y -= 6 * dt;
    m.scale.setScalar(m.userData.life / 0.35);
  }
}

// â•â•â•â•â•â•â•â•â•â•â•â•â•â•â• SHOOTING â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•
const raycaster = new THREE.Raycaster();
const shotNDC = new THREE.Vector2(0, 0);
let canShoot = true, shootCooldown = 0;
// â•â•â•â•â•â•â•â•â•â•â•â•â•â•â• BULLET EFFECTS â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•
const TRACER_STYLE = {
  pistol: { color: 0xffd27a, radius: 0.007, tail: 2.2, speed: 160, opacity: 0.85 },
  sniper: { color: 0xbfe8ff, radius: 0.012, tail: 6.0, speed: 320, opacity: 0.9 },
  auto:   { color: 0xffa24a, radius: 0.006, tail: 1.8, speed: 200, opacity: 0.8 }
};
const tracerGeo = new THREE.CylinderGeometry(1, 1, 1, 5);
const tracerMats = {};
Object.keys(TRACER_STYLE).forEach(k => {
  tracerMats[k] = new THREE.MeshBasicMaterial({ color: TRACER_STYLE[k].color, transparent: true, opacity: TRACER_STYLE[k].opacity, depthWrite: false });
});
const TRACER_POOL = 24;
const tracers = [];
for (let i = 0; i < TRACER_POOL; i++) {
  const m = new THREE.Mesh(tracerGeo, tracerMats.pistol);
  m.visible = false;
  m.userData = { start: new THREE.Vector3(), dir: new THREE.Vector3(), total: 1, t: 0, tail: 1, speed: 1, r: 0.01 };
  scene.add(m); tracers.push(m);
}
let tracerIdx = 0;
const Y_AXIS = new THREE.Vector3(0, 1, 0);
function spawnTracer(from, to, weaponId) {
  const st = TRACER_STYLE[weaponId] || TRACER_STYLE.pistol;
  const m = tracers[tracerIdx % TRACER_POOL]; tracerIdx++;
  const u = m.userData;
  u.start.copy(from);
  u.dir.copy(to).sub(from);
  u.total = u.dir.length();
  if (u.total < 0.05) return;
  u.dir.divideScalar(u.total);
  u.t = 0; u.tail = st.tail; u.speed = st.speed; u.r = st.radius;
  m.material = tracerMats[weaponId] || tracerMats.pistol;
  m.quaternion.setFromUnitVectors(Y_AXIS, u.dir);
  m.visible = true;
}
function updateTracers(dt) {
  for (let i = 0; i < TRACER_POOL; i++) {
    const m = tracers[i];
    if (!m.visible) continue;
    const u = m.userData;
    u.t += dt;
    const head = Math.min(u.speed * u.t, u.total);
    const tail = Math.max(0, u.speed * u.t - u.tail);
    if (tail >= u.total) { m.visible = false; continue; }
    const len = Math.max(0.01, head - tail);
    m.position.copy(u.start).addScaledVector(u.dir, (head + tail) / 2);
    m.scale.set(u.r, len, u.r);
  }
}
const DECAL_POOL = 48;
const decals = [];
const holeGeo = new THREE.CircleGeometry(0.05, 10);
const craterGeo = new THREE.RingGeometry(0.045, 0.1, 12);
for (let i = 0; i < DECAL_POOL; i++) {
  const g = new THREE.Group();
  const hole = new THREE.Mesh(holeGeo, new THREE.MeshBasicMaterial({ color: 0x050507, transparent: true, opacity: 0.95, depthWrite: false, polygonOffset: true, polygonOffsetFactor: -2, polygonOffsetUnits: -2 }));
  const crater = new THREE.Mesh(craterGeo, new THREE.MeshBasicMaterial({ color: 0x9a9aa6, transparent: true, opacity: 0.55, depthWrite: false, polygonOffset: true, polygonOffsetFactor: -2, polygonOffsetUnits: -2 }));
  g.add(hole); g.add(crater);
  g.visible = false; g.userData = { life: 0, hole: hole, crater: crater };
  scene.add(g); decals.push(g);
}
let decalIdx = 0;
const tmpN = new THREE.Vector3(), tmpP = new THREE.Vector3();
function spawnBulletHole(hit) {
  if (!hit || !hit.face) return;
  tmpN.copy(hit.face.normal).transformDirection(hit.object.matrixWorld);
  const g = decals[decalIdx % DECAL_POOL]; decalIdx++;
  g.position.copy(hit.point).addScaledVector(tmpN, 0.012);
  tmpP.copy(g.position).add(tmpN);
  g.lookAt(tmpP);
  g.rotateZ(Math.random() * Math.PI);
  g.scale.setScalar(0.8 + Math.random() * 0.5);
  g.userData.life = 8;
  g.userData.hole.material.opacity = 0.95; g.userData.crater.material.opacity = 0.55;
  g.visible = true;
  spawnImpact(hit.point.clone().addScaledVector(tmpN, 0.03));
}
function updateDecals(dt) {
  for (let i = 0; i < DECAL_POOL; i++) {
    const g = decals[i];
    if (!g.visible) continue;
    g.userData.life -= dt;
    if (g.userData.life <= 0) { g.visible = false; continue; }
    if (g.userData.life < 1.5) {
      const f = g.userData.life / 1.5;
      g.userData.hole.material.opacity = 0.95 * f; g.userData.crater.material.opacity = 0.55 * f;
    }
  }
}
function clearBulletEffects() {
  tracers.forEach(m => { m.visible = false; });
  decals.forEach(g => { g.visible = false; });
}
const muzzleWorld = new THREE.Vector3(), farPoint = new THREE.Vector3();
function shoot() {
  if (!state.running || state.paused || !canShoot) return;
  const W = WEAPONS[curWeapon];
  ensureAudio(); canShoot = false; shootCooldown = W.cooldown;
  playGunshot(curWeapon); triggerMuzzleFlash(); triggerRecoil(); applyKick(W.kick);
  // spread: sniper is only accurate when scoped
  let sp = W.spread;
  if (curWeapon === 'sniper' && scoped) sp = 0;
  shotNDC.set((Math.random() * 2 - 1) * sp, (Math.random() * 2 - 1) * sp);
  raycaster.setFromCamera(shotNDC, camera);
  // where does the bullet end up? (target first, otherwise the room walls)
  const targetHits = activeTarget ? raycaster.intersectObject(activeTarget, true) : [];
  const wallHits = targetHits.length ? [] : raycaster.intersectObjects(roomMeshes, false);
  const endPoint = targetHits.length ? targetHits[0].point : (wallHits.length ? wallHits[0].point : farPoint.copy(raycaster.ray.origin).addScaledVector(raycaster.ray.direction, 60));
  if (!scoped) {
    camera.updateMatrixWorld(true);
    muzzleFlash.getWorldPosition(muzzleWorld);
    spawnTracer(muzzleWorld, endPoint, curWeapon);
  }
  if (wallHits.length) spawnBulletHole(wallHits[0]);
  if (activeTarget) {
    if (targetHits.length > 0) { spawnImpact(targetHits[0].point.clone()); destroyTarget(true); return; }
  } else if (W.auto) {
    // auto rifle: shots while waiting for the next target to spawn are not counted as misses
    return;
  }
  state.misses++; updateHUD();
}
let recoilAnim = 0, recoilActive = false;
function triggerRecoil() {
  recoilActive = true; recoilAnim = 0;
  document.getElementById('crosshair').classList.add('recoil');
  setTimeout(() => document.getElementById('crosshair').classList.remove('recoil'), 60);
}
function updateGunRecoil(dt) {
  if (!recoilActive) return;
  const W = WEAPONS[curWeapon];
  const m = models[curWeapon];
  recoilAnim += dt * W.recoilSpeed;
  if (recoilAnim >= 1) {
    recoilAnim = 0; recoilActive = false;
    m.position.copy(W.rest); m.rotation.x = 0;
    return;
  }
  const t = recoilAnim < 0.3 ? recoilAnim / 0.3 : 1 - (recoilAnim - 0.3) / 0.7;
  m.position.lerpVectors(W.rest, W.recoilPos, t);
  m.rotation.x = -t * W.rotKick;
}
function triggerMuzzleFlash() {
  muzzleFlashMat.opacity = 0.9; muzzleTimer = 0.055;
  document.getElementById('muzzle-overlay').classList.add('flash');
  setTimeout(() => document.getElementById('muzzle-overlay').classList.remove('flash'), 40);
}
function updateMuzzleFlash(dt) {
  if (muzzleTimer > 0) {
    muzzleTimer -= dt;
    muzzleFlashMat.opacity = muzzleTimer <= 0 ? 0 : (muzzleTimer / 0.055) * 0.9;
    if (muzzleTimer <= 0) muzzleTimer = 0;
  }
}
const elScore=document.getElementById('s-score'), elHits=document.getElementById('s-hits');
const elMisses=document.getElementById('s-misses'), elAcc=document.getElementById('s-acc');
const elTimer=document.getElementById('timer-value'), elFps=document.getElementById('fps');
const timerPanel=document.getElementById('timer-panel');
const timerLabel=document.getElementById('timer-label');
function updateHUD() {
  elScore.textContent = state.score; elHits.textContent = state.hits; elMisses.textContent = state.misses;
  const total = state.hits + state.misses;
  elAcc.textContent = total === 0 ? '-' : Math.round((state.hits / total) * 100) + '%';
  document.getElementById('p-score').textContent = state.score;
  document.getElementById('p-hits').textContent = state.hits;
  document.getElementById('p-misses').textContent = state.misses;
  document.getElementById('p-acc').textContent = total === 0 ? '-' : Math.round((state.hits / total) * 100) + '%';
}
function formatTime(ms) { const s=Math.floor(ms/1000), m=Math.floor(s/60); return m+':'+String(s%60).padStart(2,'0'); }
function formatCountdown(sec) { const m=Math.floor(sec/60); return m > 0 ? m+':'+String(Math.ceil(sec%60)).padStart(2,'0') : Math.ceil(sec).toString(); }
function getRank(hits, acc) {
  if (acc >= 80 && hits >= 15) return 'ðŸŽ¯ Sharpshooter!';
  if (acc >= 60 && hits >= 10) return 'âœ… Good Aim!';
  if (hits === 0) return 'ðŸ˜¬ Keep Practicing';
  return 'ðŸ’ª Not Bad!';
}
function showResultPopup() {
  if (activeTarget) { scene.remove(activeTarget); activeTarget = null; }
  clearTimeout(spawnTimeout); spawnLocked = false;
  const total = state.hits + state.misses;
  const acc = total === 0 ? 0 : Math.round((state.hits / total) * 100);
  document.getElementById('rp-hits').textContent = state.hits;
  document.getElementById('rp-misses').textContent = state.misses;
  document.getElementById('rp-score').textContent = state.score;
  document.getElementById('rp-acc').textContent = total === 0 ? '-' : acc + '%';
  document.getElementById('rp-sub').textContent = selectedDuration + ' Second Challenge';
  document.getElementById('rp-title').textContent = getRank(state.hits, acc);
  const popup = document.getElementById('result-popup');
  popup.classList.remove('hidden');
  requestAnimationFrame(() => popup.classList.add('visible'));
  timerPanel.classList.remove('challenge-mode','urgent');
  timerLabel.textContent = 'Session Time';
}
function hideResultPopup() {
  const popup = document.getElementById('result-popup');
  popup.classList.remove('visible');
  setTimeout(() => popup.classList.add('hidden'), 260);
}
function showHitMarker() {
  const hm=document.getElementById('hitmarker');
  hm.classList.remove('flash'); void hm.offsetWidth; hm.classList.add('flash');
}
function showScorePopup() {
  const hud=document.getElementById('hud');
  const span=document.createElement('div');
  span.className='score-popup'; span.textContent='+100';
  span.style.left=(45+Math.random()*10)+'%'; span.style.top=(42+Math.random()*8)+'%';
  hud.appendChild(span); setTimeout(()=>span.remove(), 600);
}
let fpsFrames=0, fpsAccum=0;
function updateFPS(dt) {
  fpsFrames++; fpsAccum+=dt;
  if (fpsAccum>=0.5) {
    const fps=Math.round(fpsFrames/fpsAccum);
    elFps.textContent=fps+' FPS';
    elFps.style.color=fps>=55?'rgba(105,240,174,0.7)':fps>=30?'rgba(255,183,77,0.7)':'rgba(255,82,82,0.7)';
    fpsFrames=0; fpsAccum=0;
  }
}
let pointerLocked = false;
document.addEventListener('pointerlockchange', () => {
  if (IS_TOUCH) return;
  pointerLocked = document.pointerLockElement === canvas;
  if (!pointerLocked && state.running && !state.paused) pauseGame();
});
document.addEventListener('mousemove', (e) => {
  if (!pointerLocked || !state.running || state.paused) return;
  applyMouseMove(e.movementX, e.movementY);
});
document.addEventListener('mousedown', (e) => {
  if (!pointerLocked || !state.running || state.paused) return;
  if (e.button === 0) {
    if (WEAPONS[curWeapon].auto) mouseHeld = true;
    shoot();
  } else if (e.button === 2) {
    // right click: toggle sniper scope
    if (curWeapon === 'sniper') setScoped(!scoped);
  }
});
document.addEventListener('mouseup', (e) => {
  if (e.button === 0) mouseHeld = false;
});
document.addEventListener('contextmenu', (e) => e.preventDefault());
window.addEventListener('blur', () => { mouseHeld = false; });
document.addEventListener('keydown', (e) => {
  if (!state.running || state.paused) return;
  if (e.code === 'Digit1' || e.code === 'Numpad1') setWeapon('pistol');
  else if (e.code === 'Digit2' || e.code === 'Numpad2') setWeapon('sniper');
  else if (e.code === 'Digit3' || e.code === 'Numpad3') setWeapon('auto');
});
document.addEventListener('wheel', (e) => {
  if (!state.running || state.paused || !pointerLocked) return;
  cycleWeapon(e.deltaY > 0 ? 1 : -1);
}, { passive: true });
// auto-pause when the tab / app goes to the background
document.addEventListener('visibilitychange', () => {
  if (document.hidden && state.running && !state.paused) pauseGame();
});
// â•â•â•â•â•â•â•â•â•â•â•â•â•â•â• TOUCH CONTROLS â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•
(function setupTouch() {
  if (!IS_TOUCH) return;
  const look = document.getElementById('touch-look');
  const fire = document.getElementById('t-fire');
  const scopeBtn = document.getElementById('t-scope');
  const pauseBtn = document.getElementById('t-pause');
  const TOUCH_LOOK = 1.7;
  const live = () => state.running && !state.paused;
  let lookId = null, lx = 0, ly = 0;
  look.addEventListener('touchstart', (e) => {
    e.preventDefault(); ensureAudio();
    if (lookId !== null || !live()) return;
    const t = e.changedTouches[0];
    lookId = t.identifier; lx = t.clientX; ly = t.clientY;
  }, { passive: false });
  look.addEventListener('touchmove', (e) => {
    e.preventDefault();
    if (!live()) return;
    for (let i = 0; i < e.changedTouches.length; i++) {
      const t = e.changedTouches[i];
      if (t.identifier === lookId) {
        applyMouseMove((t.clientX - lx) * TOUCH_LOOK, (t.clientY - ly) * TOUCH_LOOK);
        lx = t.clientX; ly = t.clientY;
      }
    }
  }, { passive: false });
  const endLook = (e) => {
    for (let i = 0; i < e.changedTouches.length; i++) if (e.changedTouches[i].identifier === lookId) lookId = null;
  };
  look.addEventListener('touchend', endLook);
  look.addEventListener('touchcancel', endLook);
  fire.addEventListener('touchstart', (e) => {
    e.preventDefault(); ensureAudio();
    if (!live()) return;
    fire.classList.add('down');
    if (WEAPONS[curWeapon].auto) mouseHeld = true;
    shoot();
  }, { passive: false });
  const endFire = (e) => { e.preventDefault(); fire.classList.remove('down'); mouseHeld = false; };
  fire.addEventListener('touchend', endFire, { passive: false });
  fire.addEventListener('touchcancel', endFire, { passive: false });
  scopeBtn.addEventListener('touchstart', (e) => {
    e.preventDefault();
    if (live() && curWeapon === 'sniper') setScoped(!scoped);
  }, { passive: false });
  pauseBtn.addEventListener('touchstart', (e) => { e.preventDefault(); pauseGame(); }, { passive: false });
  WEAPON_ORDER.forEach((id) => {
    document.getElementById('ws-' + id).addEventListener('touchstart', (e) => {
      e.preventDefault();
      if (live()) setWeapon(id);
    }, { passive: false });
  });
})();
function requestPointerLock() {
  if (IS_TOUCH) return;
  try {
    const p = canvas.requestPointerLock();
    if (p && p.catch) p.catch(e => console.warn("Pointer lock error", e));
  } catch(e) {
    console.warn("Pointer lock unsupported", e);
  }
}
function startGame() {
  ensureAudio(); resetState(); state.running = true; state.startTime = performance.now();
  if (activeTarget) { scene.remove(activeTarget); activeTarget = null; }
  clearTimeout(spawnTimeout); spawnLocked = false;
  resetWeaponInput();
  clearBulletEffects();
  euler.set(0, 0, 0); camera.quaternion.setFromEuler(euler);
  canShoot = true; shootCooldown = 0;
  refreshWeaponHUD();
  updateHUD();
  hideResultPopup();
  // Challenge mode setup
  if (isChallengeMode) {
    challenge.active = true; challenge.duration = selectedDuration; challenge.remaining = selectedDuration;
    timerPanel.classList.add('challenge-mode');
    timerPanel.classList.remove('urgent');
    timerLabel.textContent = 'Time Left';
    elTimer.textContent = formatCountdown(selectedDuration);
  } else {
    challenge.active = false;
    timerPanel.classList.remove('challenge-mode','urgent');
    timerLabel.textContent = 'Session Time';
  }
  document.getElementById('start-screen').classList.add('hidden');
  document.getElementById('pause-screen').classList.add('hidden');
  document.getElementById('hud').classList.add('active');
  requestPointerLock(); spawnTarget();
}
function pauseGame() {
  if (!state.running || state.paused) return;
  state.paused = true; state.pauseStart = performance.now();
  mouseHeld = false;
  setScoped(false, true);
  document.getElementById('pause-screen').classList.remove('hidden');
  updateHUD();
}
function resumeGame() {
  if (!state.running || !state.paused) return;
  state.paused = false; state.pauseAccum += performance.now() - state.pauseStart;
  document.getElementById('pause-screen').classList.add('hidden');
  requestPointerLock();
  if (!activeTarget) spawnTarget();
}
function restartGame() { document.getElementById('pause-screen').classList.add('hidden'); startGame(); }
function endChallenge() {
  state.running = false; challenge.active = false;
  resetWeaponInput();
  if (document.pointerLockElement) document.exitPointerLock();
  document.getElementById('hud').classList.remove('active');
  showResultPopup();
}
let lastTime = performance.now();
let animFrameId = null;
function loop(now) {
  animFrameId = requestAnimationFrame(loop);
  try {
    const dt = Math.min((now - lastTime) / 1000, 0.05); lastTime = now;
    if (state.running && !state.paused) {
      if (!canShoot) { shootCooldown -= dt; if (shootCooldown <= 0) { canShoot = true; shootCooldown = 0; } }
      // full-auto: keep firing while the button is held
      if (mouseHeld && canShoot && WEAPONS[curWeapon].auto) shoot();
      updateFov(dt); updateDraw(dt); recoverKick(dt);
      updateTarget(dt); updateImpacts(dt); updateTracers(dt); updateDecals(dt); updateGunRecoil(dt); updateMuzzleFlash(dt); updateFPS(dt);
      updateWeaponBar();
      if (challenge.active) {
        challenge.remaining -= dt;
        if (challenge.remaining <= 0) { challenge.remaining = 0; endChallenge(); }
        else {
          if (elTimer) elTimer.textContent = formatCountdown(challenge.remaining);
          if (challenge.remaining <= 5) timerPanel.classList.add('urgent');
          else timerPanel.classList.remove('urgent');
        }
      } else {
        if (elTimer) elTimer.textContent = formatTime(now - state.startTime - state.pauseAccum);
      }
    }
    if (renderer) renderer.render(scene, camera);
  } catch (err) {
    console.error("Game loop error:", err);
    if (animFrameId) cancelAnimationFrame(animFrameId);
    if (state.running) pauseGame();
  }
}
document.getElementById('btn-start').addEventListener('click', startGame);
document.getElementById('btn-resume').addEventListener('click', resumeGame);
document.getElementById('btn-restart').addEventListener('click', restartGame);
document.getElementById('btn-pause-menu').addEventListener('click', () => {
  document.getElementById('pause-screen').classList.add('hidden');
  document.getElementById('start-screen').classList.remove('hidden');
  document.getElementById('hud').classList.remove('active');
  resetState();
  resetWeaponInput();
  if (activeTarget) { scene.remove(activeTarget); activeTarget = null; }
  clearTimeout(spawnTimeout); spawnLocked = false;
});
// Mode tab switching
document.getElementById('tab-infinite').addEventListener('click', () => {
  isChallengeMode = false;
  document.getElementById('tab-infinite').classList.add('active');
  document.getElementById('tab-challenge').classList.remove('active');
  document.getElementById('challenge-options').classList.remove('visible');
  document.getElementById('info-grid-infinite').style.display = '';
});
document.getElementById('tab-challenge').addEventListener('click', () => {
  isChallengeMode = true;
  document.getElementById('tab-challenge').classList.add('active');
  document.getElementById('tab-infinite').classList.remove('active');
  document.getElementById('challenge-options').classList.add('visible');
  document.getElementById('info-grid-infinite').style.display = 'none';
});
// Duration buttons
document.querySelectorAll('.dur-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    document.querySelectorAll('.dur-btn').forEach(b => b.classList.remove('selected'));
    btn.classList.add('selected');
    selectedDuration = parseInt(btn.dataset.dur, 10);
  });
});
// Result popup buttons
document.getElementById('rp-play-again').addEventListener('click', () => {
  hideResultPopup();
  setTimeout(startGame, 270);
});
document.getElementById('rp-menu').addEventListener('click', () => {
  hideResultPopup();
  document.getElementById('start-screen').classList.remove('hidden');
  document.getElementById('hud').classList.remove('active');
});
refreshWeaponHUD();
requestAnimationFrame(loop);
</script>
</body>
</html>`;
interface ToolLink { label: string; href: string; icon: React.ReactNode; }

const MORE_TOOLS: ToolLink[] = [
  { label: 'CPS Test', href: '/cps-test', icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" width="36" height="36"><path d="M12 2a7 7 0 0 1 7 7v6a7 7 0 0 1-14 0V9a7 7 0 0 1 7-7z"/><line x1="12" y1="6" x2="12" y2="10"/><circle cx="12" cy="14" r="1" fill="currentColor"/></svg> },
  { label: 'Spacebar Counter', href: '/spacebar', icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" width="36" height="36"><rect x="2" y="5" width="20" height="14" rx="2"/><line x1="6" y1="15" x2="18" y2="15"/></svg> },
  { label: 'Aim Trainer', href: '/aim-trainer', icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" width="36" height="36"><circle cx="12" cy="12" r="10"/><circle cx="12" cy="12" r="6"/><circle cx="12" cy="12" r="2"/></svg> },
  { label: 'Typing Test', href: '/typing-test', icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" width="36" height="36"><rect x="2" y="4" width="20" height="16" rx="2"/><path d="M8 15h8M7 11h2m3 0h2m3 0h-1"/></svg> },
  { label: 'Reaction Time', href: '/reaction-time', icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" width="36" height="36"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg> },
  { label: 'Scroll Test', href: '/scroll-test', icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" width="36" height="36"><circle cx="12" cy="12" r="9"/><path d="M9 11l3-3 3 3"/><path d="M9 13l3 3 3-3"/></svg> },
  { label: 'Double Click', href: '/double-click', icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" width="36" height="36"><path d="M12 2a7 7 0 0 1 7 7v6a7 7 0 0 1-14 0V9a7 7 0 0 1 7-7z"/><line x1="12" y1="6" x2="12" y2="10"/></svg> },
  { label: '3D Aim Trainer', href: '/3d-aim-trainer', icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" width="36" height="36"><circle cx="12" cy="12" r="3"/><path d="M3 12h3m12 0h3M12 3v3m0 12v3"/><circle cx="12" cy="12" r="8" opacity=".4"/></svg> },
  { label: 'Mouse Accuracy', href: '/mouse-accuracy', icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" width="36" height="36"><path d="M12 2a7 7 0 0 1 7 7v6a7 7 0 0 1-14 0V9a7 7 0 0 1 7-7z"/><path d="M12 2v10"/></svg> },
  { label: 'Key Visualizer', href: '/key-visualizer', icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" width="36" height="36"><rect x="2" y="5" width="20" height="14" rx="2"/><path d="M6 9h1m4 0h1m4 0h1M6 13h1m4 0h1m4 0h1"/></svg> },
  { label: 'F1 Reaction', href: '/f1-reaction', icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" width="36" height="36"><path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"/></svg> },
  { label: 'Space Defense', href: '/space-defense', icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" width="36" height="36"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg> },
  { label: 'Accuracy Test', href: '/accuracy', icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" width="36" height="36"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg> },
  { label: 'CPS Rush', href: '/cps-rush', icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" width="36" height="36"><path d="M12 2a7 7 0 0 1 7 7v6a7 7 0 0 1-14 0V9a7 7 0 0 1 7-7z"/><path d="M12 12v-4"/><circle cx="12" cy="14" r="1" fill="currentColor"/></svg> },
  { label: 'Voyager Game', href: '/voyager-game', icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" width="36" height="36"><path d="M12 2L8 10H2l5 4-2 8 7-4 7 4-2-8 5-4h-6z"/></svg> },
  { label: 'Space Waves', href: '/space-waves', icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" width="36" height="36"><path d="M2 12h4l3-9 5 18 3-9h5"/></svg> }
];

export default function SniperModePage() {
  const containerRef = useRef<HTMLDivElement>(null);
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [fsSupported, setFsSupported] = useState(false);

  useEffect(() => {
    const d = document as any;
    setFsSupported(!!(d.fullscreenEnabled || d.webkitFullscreenEnabled));
    const handleFsChange = () => {
      setIsFullscreen(!!(d.fullscreenElement || d.webkitFullscreenElement));
    };
    document.addEventListener('fullscreenchange', handleFsChange);
    document.addEventListener('webkitfullscreenchange', handleFsChange);
    return () => {
      document.removeEventListener('fullscreenchange', handleFsChange);
      document.removeEventListener('webkitfullscreenchange', handleFsChange);
    };
  }, []);

  const toggleFullscreen = useCallback(() => {
    const el = containerRef.current as any;
    const d = document as any;
    if (!el) return;
    try {
      if (!(d.fullscreenElement || d.webkitFullscreenElement)) {
        const p = (el.requestFullscreen || el.webkitRequestFullscreen)?.call(el);
        if (p && p.catch) p.catch(() => {});
      } else {
        const p = (d.exitFullscreen || d.webkitExitFullscreen)?.call(d);
        if (p && p.catch) p.catch(() => {});
      }
    } catch (e) {}
  }, []);

  return (
    <div style={{ width: '100%', minHeight: '100vh' }}>
      <style>{'.aim-wrap{height:100vh;height:100dvh}'}</style>
      <div ref={containerRef} className="aim-wrap" style={{ width: '100%', position: 'relative', background: '#0a0a0c', overflow: 'hidden' }}>
        <iframe
          ref={iframeRef}
          srcDoc={aimTrainerHTML}
          style={{
            width: '100%',
            height: '100%',
            border: 'none',
            display: 'block',
          }}
          allow="fullscreen; autoplay"
          title="3D Aim Trainer"
        />
          <div style={{ position: 'absolute', top: '16px', left: '20px', zIndex: 100, pointerEvents: 'none' }}>
            <span style={{ margin: 0, fontSize: '0.85rem', fontWeight: 600, color: 'rgba(255,255,255,0.4)', textTransform: 'uppercase', letterSpacing: '0.05em', textShadow: '0 2px 4px rgba(0,0,0,0.5)' }}>
              3D Aim Trainer
            </span>
          </div>
        <div style={{ position: 'absolute', top: '14px', right: '14px', display: fsSupported ? 'flex' : 'none', gap: '8px', zIndex: 100 }}>
          <button onClick={toggleFullscreen} aria-label={isFullscreen ? 'Exit fullscreen' : 'Enter fullscreen'} style={{ background: 'rgba(4,9,20,0.8)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '8px', padding: '7px', color: 'rgba(255,255,255,0.85)', cursor: 'pointer', display: 'flex', alignItems: 'center' }}>
            {isFullscreen ? <Minimize size={16} /> : <Maximize size={16} />}
          </button>
        </div>
      </div>

      <section aria-label="More Tools" style={{ maxWidth: '1000px', margin: '4rem auto 0 auto', padding: '0 1rem' }}>
        <h2 style={{
          fontWeight: 800, fontSize: '1.5rem', color: '#000000',
          marginBottom: '1.5rem', textAlign: 'center', letterSpacing: '-0.3px',
        }}>More Tools</h2>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(130px, 1fr))',
          gap: '1rem',
        }}>
          {MORE_TOOLS.map(({ label, href, icon }) => (
            <a
              key={href}
              href={href}
              style={{
                display: 'flex', flexDirection: 'column', alignItems: 'center',
                justifyContent: 'center', gap: '0.6rem',
                background: 'rgba(255,255,255,0.03)',
                border: '1px solid rgba(255,255,255,0.07)',
                borderRadius: '14px',
                padding: '1.2rem 0.5rem',
                cursor: 'pointer', textDecoration: 'none',
                transition: 'all 0.2s ease',
              }}
              onMouseEnter={e => {
                (e.currentTarget as HTMLElement).style.background = `rgba(79,195,247,0.08)`;
                (e.currentTarget as HTMLElement).style.borderColor = `rgba(79,195,247,0.35)`;
                (e.currentTarget as HTMLElement).style.transform = 'translateY(-2px)';
              }}
              onMouseLeave={e => {
                (e.currentTarget as HTMLElement).style.background = 'rgba(255,255,255,0.03)';
                (e.currentTarget as HTMLElement).style.borderColor = 'rgba(255,255,255,0.07)';
                (e.currentTarget as HTMLElement).style.transform = 'translateY(0)';
              }}
            >
              <div style={{
                width: '56px', height: '56px', borderRadius: '12px',
                background: 'rgba(255,255,255,0.05)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                color: '#4fc3f7', transition: 'color 0.3s ease',
              }}>
                {icon}
              </div>
              <span style={{ color: '#d1d1de', fontSize: '0.8rem', fontWeight: 600, textAlign: 'center' }}>{label}</span>
            </a>
          ))}
        </div>
      </section>
      
      
      
      
      <article style={{ maxWidth: '1000px', margin: '0 auto', padding: 'clamp(2rem, 6vw, 4rem) clamp(1rem, 4vw, 2rem)', overflowWrap: 'anywhere', color: '#2D3436', fontFamily: 'system-ui, sans-serif', lineHeight: '1.6' }}>
        
        {/* Table of Contents */}
        <nav aria-label="Table of Contents" style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.07)', borderRadius: '12px', padding: '1.5rem', marginBottom: '3rem' }}>
          <h2 style={{ fontSize: '1.2rem', fontWeight: 700, color: '#000000', marginBottom: '1rem', marginTop: 0 }}>Table of Contents</h2>
          <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(250px, 100%), 1fr))', gap: '0.5rem' }}>
            <li><a href="#introduction" style={{ color: '#4fc3f7', textDecoration: 'none' }}>1. Introduction to FPS Aim Training</a></li>
            <li><a href="#fixedaim-features" style={{ color: '#4fc3f7', textDecoration: 'none' }}>2. Why Choose FixedAim?</a></li>
            <li><a href="#how-to-use" style={{ color: '#4fc3f7', textDecoration: 'none' }}>3. How to Use FixedAim</a></li>
            <li><a href="#weapons" style={{ color: '#4fc3f7', textDecoration: 'none' }}>4. Weapons: Pistol, Sniper & Auto Rifle</a></li>
            <li><a href="#training-plan" style={{ color: '#4fc3f7', textDecoration: 'none' }}>5. 7-Day Beginner Training Plan</a></li>
            <li><a href="#game-specific" style={{ color: '#4fc3f7', textDecoration: 'none' }}>6. Game-Specific Aim Training (CS2, Valorant, Apex)</a></li>
            <li><a href="#aim-mechanics" style={{ color: '#4fc3f7', textDecoration: 'none' }}>7. Core Aim Mechanics Explained</a></li>
            <li><a href="#ergonomics-grips" style={{ color: '#4fc3f7', textDecoration: 'none' }}>8. Mouse Grips & Ergonomics</a></li>
            <li><a href="#comparison" style={{ color: '#4fc3f7', textDecoration: 'none' }}>9. FixedAim vs. Desktop Trainers</a></li>
            <li><a href="#hardware" style={{ color: '#4fc3f7', textDecoration: 'none' }}>10. Hardware & Settings Checklist</a></li>
            <li><a href="#faq" style={{ color: '#4fc3f7', textDecoration: 'none' }}>11. Frequently Asked Questions</a></li>
          </ul>
        </nav>

        <h1 style={{ fontSize: 'clamp(1.6rem, 6vw, 2.5rem)', fontWeight: 900, marginBottom: '2.5rem', color: '#000000', textAlign: 'center', textTransform: 'uppercase', letterSpacing: '-0.02em' }}>3D Aim Trainer â€” The Ultimate Guide to FPS Aim Training</h1>
        
        <section id="introduction" style={{ marginBottom: '3rem' }}>
          <h2 style={{ fontSize: '1.8rem', fontWeight: 900, color: '#000000', marginBottom: '1rem', paddingLeft: '1rem', borderLeft: '4px solid rgba(0,245,255,0.7)', lineHeight: '1.2' }}>Introduction to FPS Aim Training</h2>
          <p style={{ marginBottom: '1rem' }}>
            Aim training in a three-dimensional environment has revolutionized how competitive gamers prepare for tactical shooters and battle royales. Unlike simple 2D clicker games, an online aim practice tool immerses you in a simulated spatial environment that requires precise camera rotation, crosshair placement, and depth perception.
          </p>
          <p style={{ marginBottom: '1rem' }}>
            According to principles of <a href="https://en.wikipedia.org/wiki/Motor_learning" target="_blank" rel="noopener noreferrer" style={{ color: '#4fc3f7', textDecoration: 'none' }}>motor learning</a>, the specificity of practice is paramount. When you train in a dedicated 3D space, you are engaging the exact spatial awareness mechanisms relied upon in actual gameplay. Consistent, targeted repetition may lead to structural changes in the brain that support rapid, automatic execution of complex motor tasks, commonly referred to as building "muscle memory."
          </p>
          <div style={{ textAlign: 'center', margin: '2rem 0' }}>
            <button onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} style={{ background: 'linear-gradient(135deg, #4fc3f7 0%, #0288d1 100%)', color: '#000000', border: 'none', borderRadius: '8px', padding: '12px 32px', fontSize: '1.1rem', fontWeight: 700, cursor: 'pointer', boxShadow: '0 4px 15px rgba(79,195,247,0.3)', transition: 'transform 0.2s' }}>
              Start Training Now
            </button>
          </div>
        </section>

        <section id="fixedaim-features" style={{ marginBottom: '3rem' }}>
          <h2 style={{ fontSize: '1.8rem', fontWeight: 900, color: '#000000', marginBottom: '1rem', paddingLeft: '1rem', borderLeft: '4px solid rgba(0,245,255,0.7)', lineHeight: '1.2' }}>Why Choose FixedAim?</h2>
          <p style={{ marginBottom: '1rem' }}>
            Built by passionate developers and competitive gamers, FixedAim provides a seamless, friction-free environment to hone your mechanics. We understand that you want to train without bloat, loading screens, or paywalls.
          </p>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem', marginBottom: '1.5rem' }}>
            {[
              { title: '100% Free & Unlocked', desc: 'No premium subscriptions or hidden features.' },
              { title: 'Browser-Based', desc: 'Runs directly in your browser. Compatible with Chrome, Edge, Firefox, and Safari.' },
              { title: 'No Installation', desc: 'Zero downloads required. Get straight into the action in seconds.' },
              { title: 'Privacy First', desc: 'No login required. Your data and stats stay local to your machine.' }
            ].map((feature, i) => (
              <div key={i} style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.07)', borderRadius: '10px', padding: '1.25rem' }}>
                <h3 style={{ fontSize: '1.1rem', color: '#4fc3f7', marginBottom: '0.5rem', marginTop: 0 }}>{feature.title}</h3>
                <p style={{ fontSize: '0.9rem', color: '#2D3436', margin: 0 }}>{feature.desc}</p>
              </div>
            ))}
          </div>
          <h3 style={{ fontSize: '1.4rem', color: '#000000', marginBottom: '1rem' }}>Live Performance Tracking</h3>
          <p style={{ marginBottom: '1rem' }}>Our tool doesn't just let you shoot targets; it tracks every micro-movement to provide real-time performance statistics, including:</p>
          <ul style={{ paddingLeft: '1.5rem', marginBottom: '1rem' }}>
            <li style={{ marginBottom: '0.5rem' }}><strong style={{ color: '#00f5ff' }}>Accuracy (%):</strong> Your precision rating. Hitting 90%+ consistently is better than missing fast.</li>
            <li style={{ marginBottom: '0.5rem' }}><strong style={{ color: '#00ff88' }}>Hits & Misses:</strong> Raw hit and miss counts to evaluate your volume of fire and trigger discipline.</li>
            <li style={{ marginBottom: '0.5rem' }}><strong style={{ color: '#bf5af2' }}>Score:</strong> An aggregated point system rewarding both speed and accuracy.</li>
            <li style={{ marginBottom: '0.5rem' }}><strong style={{ color: '#ffd60a' }}>Session Time:</strong> A live timer to ensure you don't overtrain and hit cognitive fatigue.</li>
          </ul>
        </section>
        
        <section id="how-to-use" style={{ marginBottom: '3rem' }}>
          <h2 style={{ fontSize: '1.8rem', fontWeight: 900, color: '#000000', marginBottom: '1rem', paddingLeft: '1rem', borderLeft: '4px solid rgba(0,245,255,0.7)', lineHeight: '1.2' }}>How to Use FixedAim (Step-by-Step)</h2>
          <p style={{ marginBottom: '1rem' }}>Getting started with FixedAim is incredibly simple. Follow these steps to begin your first session:</p>
          <ol style={{ paddingLeft: '1.5rem', marginBottom: '1rem' }}>
            <li style={{ marginBottom: '0.75rem' }}><strong style={{ color: '#000000' }}>Match Your Sensitivity:</strong> Before starting, ensure your mouse DPI is set to your usual gaming standard (e.g., 400, 800, or 1600 DPI).</li>
            <li style={{ marginBottom: '0.75rem' }}><strong style={{ color: '#000000' }}>Start the Trainer:</strong> Click the "Start Training" button at the top of the page. Your mouse cursor will lock to the screen for a true FPS experience.</li>
            <li style={{ marginBottom: '0.75rem' }}><strong style={{ color: '#000000' }}>Acquire Targets:</strong> 3D targets will spawn randomly in the virtual environment. Look around using your mouse.</li>
            <li style={{ marginBottom: '0.75rem' }}><strong style={{ color: '#000000' }}>Pick Your Weapon:</strong> Press 1, 2 or 3 (or scroll your mouse wheel) to switch between the Pistol, Sniper and Auto Rifle.</li>
            <li style={{ marginBottom: '0.75rem' }}><strong style={{ color: '#000000' }}>Shoot and Track:</strong> Left-click to shoot. For moving targets, track them smoothly across your screen before firing.</li>
            <li style={{ marginBottom: '0.75rem' }}><strong style={{ color: '#000000' }}>Analyze Your Stats:</strong> Press ESC at any time to pause the game and unlock your cursor. Review your Accuracy, Hits, and Misses on the HUD.</li>
            <li style={{ marginBottom: '0.75rem' }}><strong style={{ color: '#000000' }}>Iterate and Repeat:</strong> Hit "Resume" to continue or "Restart" to wipe the slate clean and try for a higher score!</li>
          </ol>
        </section>

        <section id="weapons" style={{ marginBottom: '3rem' }}>
          <h2 style={{ fontSize: '1.8rem', fontWeight: 900, color: '#000000', marginBottom: '1rem', paddingLeft: '1rem', borderLeft: '4px solid rgba(0,245,255,0.7)', lineHeight: '1.2' }}>Weapons: Pistol, Sniper & Auto Rifle</h2>
          <p style={{ marginBottom: '1rem' }}>The trainer now includes three weapons, each one built to practice a different part of your aim. Switch between them at any time during a session.</p>
          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.9rem', marginBottom: '1rem' }}>
              <thead>
                <tr style={{ background: 'rgba(79,195,247,0.1)', borderBottom: '1px solid rgba(79,195,247,0.3)' }}>
                  <th style={{ padding: '0.75rem', textAlign: 'left', color: '#000000' }}>Weapon</th>
                  <th style={{ padding: '0.75rem', textAlign: 'left', color: '#000000' }}>Key</th>
                  <th style={{ padding: '0.75rem', textAlign: 'left', color: '#000000' }}>Fire Mode</th>
                  <th style={{ padding: '0.75rem', textAlign: 'left', color: '#000000' }}>Best For</th>
                </tr>
              </thead>
              <tbody>
                <tr style={{ borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
                  <td style={{ padding: '0.75rem', color: '#000000', fontWeight: 600 }}>Pistol</td>
                  <td style={{ padding: '0.75rem', color: '#2D3436' }}>1</td>
                  <td style={{ padding: '0.75rem', color: '#2D3436' }}>Semi-auto, one shot per click</td>
                  <td style={{ padding: '0.75rem', color: '#2D3436' }}>Click timing and flick accuracy</td>
                </tr>
                <tr style={{ borderBottom: '1px solid rgba(255,255,255,0.05)', background: 'rgba(255,255,255,0.02)' }}>
                  <td style={{ padding: '0.75rem', color: '#000000', fontWeight: 600 }}>Sniper</td>
                  <td style={{ padding: '0.75rem', color: '#2D3436' }}>2</td>
                  <td style={{ padding: '0.75rem', color: '#2D3436' }}>Bolt-action, right click to scope</td>
                  <td style={{ padding: '0.75rem', color: '#2D3436' }}>Precision and patience. Hip-fire is inaccurate, so scope in first.</td>
                </tr>
                <tr>
                  <td style={{ padding: '0.75rem', color: '#000000', fontWeight: 600 }}>Auto Rifle</td>
                  <td style={{ padding: '0.75rem', color: '#2D3436' }}>3</td>
                  <td style={{ padding: '0.75rem', color: '#2D3436' }}>Full-auto, hold left click</td>
                  <td style={{ padding: '0.75rem', color: '#2D3436' }}>Tracking and recoil control</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>
        
        <section id="training-plan" style={{ marginBottom: '3rem' }}>
          <h2 style={{ fontSize: '1.8rem', fontWeight: 900, color: '#000000', marginBottom: '1rem', paddingLeft: '1rem', borderLeft: '4px solid rgba(0,245,255,0.7)', lineHeight: '1.2' }}>7-Day Beginner Training Plan</h2>
          <p style={{ marginBottom: '1rem' }}>Consistency is the secret to building mechanical skill. If you are new to aim training, follow this structured 7-day routine. Spend <strong>15 to 20 minutes daily</strong> on FixedAim to build foundational muscle memory without burning out.</p>
          <div style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.07)', borderRadius: '10px', padding: '1.25rem' }}>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
              <li style={{ marginBottom: '1rem', paddingBottom: '1rem', borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
                <strong style={{ color: '#4fc3f7' }}>Days 1 & 2: Accuracy Over Speed</strong><br/>
                <span style={{ color: '#2D3436', fontSize: '0.9rem' }}>Focus purely on hitting the target. Do not rush your clicks. Aim for a minimum of <strong>90% accuracy</strong>. If you miss, slow down. This builds the initial neural pathways.</span>
              </li>
              <li style={{ marginBottom: '1rem', paddingBottom: '1rem', borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
                <strong style={{ color: '#00ff88' }}>Days 3 & 4: Micro-Corrections</strong><br/>
                <span style={{ color: '#2D3436', fontSize: '0.9rem' }}>Flick to the target quickly, but pause for a split-second to verify your crosshair is centered before clicking. Try to maintain <strong>85% accuracy</strong> while increasing initial flick speed.</span>
              </li>
              <li style={{ marginBottom: '1rem', paddingBottom: '1rem', borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
                <strong style={{ color: '#bf5af2' }}>Days 5 & 6: Pushing the Pace</strong><br/>
                <span style={{ color: '#2D3436', fontSize: '0.9rem' }}>Start trusting your muscle memory. Shoot the moment you feel the crosshair is on target. Your accuracy may drop to <strong>75-80%</strong>, but your targets-per-minute (Score) should increase significantly.</span>
              </li>
              <li>
                <strong style={{ color: '#ffd60a' }}>Day 7: The Benchmark Test</strong><br/>
                <span style={{ color: '#2D3436', fontSize: '0.9rem' }}>Treat today as a ranked match. Do a 3-minute warm-up, then do 3 serious runs. Record your highest Score and Accuracy. This is your new baseline for the following week!</span>
              </li>
            </ul>
          </div>
        </section>

        <section id="game-specific" style={{ marginBottom: '3rem' }}>
          <h2 style={{ fontSize: '1.8rem', fontWeight: 900, color: '#000000', marginBottom: '1rem', paddingLeft: '1rem', borderLeft: '4px solid rgba(0,245,255,0.7)', lineHeight: '1.2' }}>Game-Specific Aim Training</h2>
          <p style={{ marginBottom: '1rem' }}>Different first-person shooters demand entirely different subsets of aiming mechanics. Tailoring your training to the game you play is critical for competitive success.</p>
          
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(260px, 100%), 1fr))', gap: '1.5rem', marginTop: '1.5rem' }}>
            <div style={{ background: 'linear-gradient(180deg, rgba(255,70,85,0.05) 0%, rgba(0,0,0,0.2) 100%)', border: '1px solid rgba(255,70,85,0.2)', borderRadius: '12px', padding: '1.5rem' }}>
              <h3 style={{ color: '#ff4655', marginTop: 0, marginBottom: '0.75rem', fontSize: '1.2rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="#ff4655"><path d="M12 2L2 22h20L12 2zm0 4.5l6.5 13h-13L12 6.5z"/></svg>
                Tactical Shooters (Valorant, CS2)
              </h3>
              <p style={{ color: '#2D3436', fontSize: '0.95rem', marginBottom: '1rem' }}>Tactical FPS games have extremely low Time-To-Kill (TTK). A single headshot ends the fight. Therefore, training should prioritize:</p>
              <ul style={{ paddingLeft: '1.2rem', color: '#2D3436', fontSize: '0.9rem' }}>
                <li style={{ marginBottom: '0.5rem' }}><strong>Crosshair Placement:</strong> Pre-aiming corners at head height.</li>
                <li style={{ marginBottom: '0.5rem' }}><strong>Micro-Flicks:</strong> Tiny, fast adjustments from a good crosshair position directly to the target's head.</li>
                <li style={{ marginBottom: '0.5rem' }}><strong>Click Timing:</strong> Firing at the exact moment you counter-strafe to an absolute stop.</li>
              </ul>
            </div>
            
            <div style={{ background: 'linear-gradient(180deg, rgba(0,255,136,0.05) 0%, rgba(0,0,0,0.2) 100%)', border: '1px solid rgba(0,255,136,0.2)', borderRadius: '12px', padding: '1.5rem' }}>
              <h3 style={{ color: '#00ff88', marginTop: 0, marginBottom: '0.75rem', fontSize: '1.2rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="#00ff88"><circle cx="12" cy="12" r="10" fill="none" stroke="#00ff88" strokeWidth="2"/><path d="M12 6v6l4 2" stroke="#00ff88" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
                Tracking Shooters (Apex, Overwatch)
              </h3>
              <p style={{ color: '#2D3436', fontSize: '0.95rem', marginBottom: '1rem' }}>These games feature high TTK, fast player movement, and verticality. You cannot rely on a single flick shot. Training must focus on:</p>
              <ul style={{ paddingLeft: '1.2rem', color: '#2D3436', fontSize: '0.9rem' }}>
                <li style={{ marginBottom: '0.5rem' }}><strong>Smooth Tracking:</strong> Keeping the crosshair glued to a target that is strafing unpredictably.</li>
                <li style={{ marginBottom: '0.5rem' }}><strong>Reactivity:</strong> How quickly you can change the direction of your mouse when the enemy changes strafe direction.</li>
                <li style={{ marginBottom: '0.5rem' }}><strong>Target Switching:</strong> Rapidly transitioning fire from one low-HP target to another during team fights.</li>
              </ul>
            </div>
          </div>
        </section>

        <section id="aim-mechanics" style={{ marginBottom: '3rem' }}>
          <h2 style={{ fontSize: '1.8rem', fontWeight: 900, color: '#000000', marginBottom: '1rem', paddingLeft: '1rem', borderLeft: '4px solid rgba(0,245,255,0.7)', lineHeight: '1.2' }}>Core Aim Mechanics Explained</h2>
          <p style={{ marginBottom: '1rem' }}>Aiming is a cluster of distinct sub-skills. Identifying your weakest link can help you structure a more effective training routine.</p>
          
          <div style={{ background: 'rgba(0,0,0,0.3)', borderRadius: '12px', padding: '1.5rem', marginBottom: '1.5rem', border: '1px solid rgba(255,255,255,0.05)' }}>
            <h3 style={{ color: '#000000', marginTop: 0, marginBottom: '1rem' }}>Visualizing Aim Mechanics</h3>
            <div style={{ display: 'flex', justifyContent: 'space-around', flexWrap: 'wrap', gap: '1rem' }}>
              <div style={{ textAlign: 'center' }}>
                <div style={{ width: '80px', height: '80px', borderRadius: '50%', border: '2px dashed #4fc3f7', margin: '0 auto 0.5rem', position: 'relative' }}>
                  <div style={{ position: 'absolute', top: '50%', left: '50%', width: '10px', height: '10px', background: '#ff4444', borderRadius: '50%', transform: 'translate(-50%, -50%)' }}></div>
                  <svg width="80" height="80" style={{ position: 'absolute', top: 0, left: 0 }}><path d="M 40,40 L 70,20" stroke="#4fc3f7" strokeWidth="2" markerEnd="url(#arrowhead)"/></svg>
                </div>
                <span style={{ fontSize: '0.85rem', color: '#2D3436' }}>Flicking</span>
              </div>
              <div style={{ textAlign: 'center' }}>
                <div style={{ width: '80px', height: '80px', borderRadius: '50%', border: '2px solid rgba(255,255,255,0.1)', margin: '0 auto 0.5rem', position: 'relative', overflow: 'hidden' }}>
                   <div style={{ position: 'absolute', top: '50%', left: '20%', width: '14px', height: '14px', background: '#00ff88', borderRadius: '50%', transform: 'translate(-50%, -50%)' }}></div>
                   <svg width="80" height="80" style={{ position: 'absolute', top: 0, left: 0 }}><path d="M 16,40 Q 40,10 64,40" stroke="#00ff88" strokeWidth="2" fill="none"/></svg>
                </div>
                <span style={{ fontSize: '0.85rem', color: '#2D3436' }}>Tracking</span>
              </div>
            </div>
          </div>

          <ul style={{ paddingLeft: '1.5rem', marginBottom: '1rem' }}>
            <li style={{ marginBottom: '0.5rem' }}><strong style={{ color: '#00f5ff' }}>Flicking:</strong> The rapid, explosive movement of the crosshair to a target. It relies heavily on spatial memory and fast twitch responses.</li>
            <li style={{ marginBottom: '0.5rem' }}><strong style={{ color: '#00ff88' }}>Tracking:</strong> Keeping the crosshair smoothly locked onto a moving target. Requires continuous visual processing.</li>
            <li style={{ marginBottom: '0.5rem' }}><strong style={{ color: '#bf5af2' }}>Crosshair Placement:</strong> Pre-aiming at the exact height and angle where an enemy is likely to appear, minimizing the need for drastic flicks.</li>
          </ul>
        </section>

        <section id="ergonomics-grips" style={{ marginBottom: '3rem' }}>
          <h2 style={{ fontSize: '1.8rem', fontWeight: 900, color: '#000000', marginBottom: '1rem', paddingLeft: '1rem', borderLeft: '4px solid rgba(0,245,255,0.7)', lineHeight: '1.2' }}>Mouse Grips & Ergonomics</h2>
          <p style={{ marginBottom: '1rem' }}>The way you interact physically with your mouse drastically impacts your aiming potential and long-term health. The Esports medical community frequently warns about Repetitive Strain Injuries (RSI) stemming from poor ergonomics.</p>
          
          <h3 style={{ fontSize: '1.4rem', color: '#000000', marginBottom: '1rem' }}>The 3 Primary Mouse Grips</h3>
          <ul style={{ paddingLeft: '1.5rem', marginBottom: '1.5rem' }}>
            <li style={{ marginBottom: '0.75rem' }}><strong style={{ color: '#000000' }}>Palm Grip:</strong> The entire hand rests on the mouse. Offers high stability and smooth tracking control, but limits vertical range of motion. Great for low sensitivity players.</li>
            <li style={{ marginBottom: '0.75rem' }}><strong style={{ color: '#000000' }}>Claw Grip:</strong> The base of the palm rests on the mouse, with fingers arched like a claw. Provides a hybrid of stability and quick micro-adjustment capabilities. The most popular grip among tactical shooter pros.</li>
            <li style={{ marginBottom: '0.75rem' }}><strong style={{ color: '#000000' }}>Fingertip Grip:</strong> Only the fingertips touch the mouse. Offers maximum speed and vertical agility, but requires excellent fine motor control and can be fatiguing. Best for tracking-heavy games.</li>
          </ul>

          <div style={{ background: 'rgba(255,200,0,0.1)', borderLeft: '4px solid #ffcc00', padding: '1rem 1.5rem', borderRadius: '0 8px 8px 0' }}>
            <h4 style={{ color: '#ffcc00', marginTop: 0, marginBottom: '0.5rem', fontSize: '1.1rem' }}>Ergonomic Warning: Beware the "Death Grip"</h4>
            <p style={{ color: '#2D3436', fontSize: '0.9rem', margin: 0 }}>
              Squeezing your mouse too tightly (the "death grip") creates immense tension in your forearm flexors, leading to "aim shake" (micro-tremors) and significantly increasing the risk of carpal tunnel syndrome. Consciously practice a relaxed grip during aim training sessions.
            </p>
          </div>
        </section>

        <section id="comparison" style={{ marginBottom: '3rem' }}>
          <h2 style={{ fontSize: '1.8rem', fontWeight: 900, color: '#000000', marginBottom: '1rem', paddingLeft: '1rem', borderLeft: '4px solid rgba(0,245,255,0.7)', lineHeight: '1.2' }}>FixedAim vs. Desktop Trainers</h2>
          <p style={{ marginBottom: '1rem' }}>How does our browser aim trainer stack up against heavy desktop clients like Aim Lab or KovaaK's?</p>
          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.9rem', marginBottom: '1rem' }}>
              <thead>
                <tr style={{ background: 'rgba(79,195,247,0.1)', borderBottom: '1px solid rgba(79,195,247,0.3)' }}>
                  <th style={{ padding: '0.75rem', textAlign: 'left', color: '#000000' }}>Feature</th>
                  <th style={{ padding: '0.75rem', textAlign: 'left', color: '#4fc3f7' }}>FixedAim</th>
                  <th style={{ padding: '0.75rem', textAlign: 'left', color: '#2D3436' }}>Desktop Trainers</th>
                </tr>
              </thead>
              <tbody>
                <tr style={{ borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
                  <td style={{ padding: '0.75rem', color: '#2D3436' }}>Installation Required</td>
                  <td style={{ padding: '0.75rem', color: '#00ff88', fontWeight: 'bold' }}>No (Browser-based)</td>
                  <td style={{ padding: '0.75rem', color: '#ff4444' }}>Yes (10GB+ Downloads)</td>
                </tr>
                <tr style={{ borderBottom: '1px solid rgba(255,255,255,0.05)', background: 'rgba(255,255,255,0.01)' }}>
                  <td style={{ padding: '0.75rem', color: '#2D3436' }}>Account & Login</td>
                  <td style={{ padding: '0.75rem', color: '#00ff88', fontWeight: 'bold' }}>Not Required</td>
                  <td style={{ padding: '0.75rem', color: '#ff4444' }}>Required</td>
                </tr>
                <tr style={{ borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
                  <td style={{ padding: '0.75rem', color: '#2D3436' }}>Engine Technology</td>
                  <td style={{ padding: '0.75rem', color: '#00ff88', fontWeight: 'bold' }}>WebGL (Instant Load)</td>
                  <td style={{ padding: '0.75rem', color: '#2D3436' }}>Unity / Unreal Engine</td>
                </tr>
                <tr style={{ borderBottom: '1px solid rgba(255,255,255,0.05)', background: 'rgba(255,255,255,0.01)' }}>
                  <td style={{ padding: '0.75rem', color: '#2D3436' }}>Custom Drills</td>
                  <td style={{ padding: '0.75rem', color: '#2D3436', fontWeight: 'bold' }}>Core fundamentals</td>
                  <td style={{ padding: '0.75rem', color: '#00ff88' }}>Extensive Sandbox</td>
                </tr>
                <tr style={{ borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
                  <td style={{ padding: '0.75rem', color: '#2D3436' }}>Updates & Patches</td>
                  <td style={{ padding: '0.75rem', color: '#00ff88', fontWeight: 'bold' }}>Seamless (Always updated)</td>
                  <td style={{ padding: '0.75rem', color: '#ff4444' }}>Manual client updates</td>
                </tr>
                <tr style={{ borderBottom: '1px solid rgba(255,255,255,0.05)', background: 'rgba(255,255,255,0.01)' }}>
                  <td style={{ padding: '0.75rem', color: '#2D3436' }}>Performance Impact</td>
                  <td style={{ padding: '0.75rem', color: '#00ff88', fontWeight: 'bold' }}>Ultra Lightweight</td>
                  <td style={{ padding: '0.75rem', color: '#ff4444' }}>Heavy CPU/GPU usage</td>
                </tr>
                <tr style={{ borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
                  <td style={{ padding: '0.75rem', color: '#2D3436' }}>Price</td>
                  <td style={{ padding: '0.75rem', color: '#00ff88', fontWeight: 'bold' }}>100% Free</td>
                  <td style={{ padding: '0.75rem', color: '#2D3436' }}>Free or Paid</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        <section id="hardware" style={{ marginBottom: '3rem' }}>
          <h2 style={{ fontSize: '1.8rem', fontWeight: 900, color: '#000000', marginBottom: '1rem', paddingLeft: '1rem', borderLeft: '4px solid rgba(0,245,255,0.7)', lineHeight: '1.2' }}>Hardware & Settings Checklist</h2>
          <p style={{ marginBottom: '1rem' }}>Your hardware settings determine the physical mapping between hand movement and crosshair movement. For the best training results, optimize the following:</p>
          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.9rem' }}>
              <thead>
                <tr style={{ background: 'rgba(0,245,255,0.08)', borderBottom: '1px solid rgba(0,245,255,0.2)' }}>
                  <th style={{ padding: '0.75rem', textAlign: 'left', color: '#00f5ff' }}>Setting / Hardware</th>
                  <th style={{ padding: '0.75rem', textAlign: 'left', color: '#00f5ff' }}>Recommendation</th>
                  <th style={{ padding: '0.75rem', textAlign: 'left', color: '#00f5ff' }}>Why it matters</th>
                </tr>
              </thead>
              <tbody>
                <tr style={{ borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
                  <td style={{ padding: '0.75rem', color: '#000000', fontWeight: 600 }}>Mouse DPI</td>
                  <td style={{ padding: '0.75rem', color: '#2D3436' }}>400 - 1600 DPI</td>
                  <td style={{ padding: '0.75rem', color: '#2D3436' }}>Lower DPI is standard for precision. Higher DPI reduces input delay marginally but requires very low in-game sensitivity.</td>
                </tr>
                <tr style={{ borderBottom: '1px solid rgba(255,255,255,0.05)', background: 'rgba(255,255,255,0.02)' }}>
                  <td style={{ padding: '0.75rem', color: '#000000', fontWeight: 600 }}>Raw Input</td>
                  <td style={{ padding: '0.75rem', color: '#00ff88' }}>ON</td>
                  <td style={{ padding: '0.75rem', color: '#2D3436' }}>Bypasses Windows mouse acceleration, ensuring 1:1 consistent mapping of physical to virtual movement.</td>
                </tr>
                <tr style={{ borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
                  <td style={{ padding: '0.75rem', color: '#000000', fontWeight: 600 }}>Monitor Refresh Rate</td>
                  <td style={{ padding: '0.75rem', color: '#2D3436' }}>144Hz+ Minimum</td>
                  <td style={{ padding: '0.75rem', color: '#2D3436' }}>Provides more recent visual information, drastically improving tracking of fast-moving targets.</td>
                </tr>
                <tr style={{ borderBottom: '1px solid rgba(255,255,255,0.05)', background: 'rgba(255,255,255,0.02)' }}>
                  <td style={{ padding: '0.75rem', color: '#000000', fontWeight: 600 }}>Mouse Weight</td>
                  <td style={{ padding: '0.75rem', color: '#2D3436' }}>&lt; 70 grams</td>
                  <td style={{ padding: '0.75rem', color: '#2D3436' }}>Lighter mice have less inertia, making flicking and sudden stops significantly more precise.</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        <section id="faq" className="faq-section" style={{ marginBottom: '3rem' }}>
          <h2 style={{ fontSize: '1.8rem', fontWeight: 900, marginBottom: '1.5rem', paddingLeft: '1rem', borderLeft: '4px solid rgba(0,245,255,0.7)', lineHeight: '1.2' }}>Frequently Asked Questions</h2>
          <div className="faq" style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
            {[
              { q: 'What is eDPI and why does it matter?', a: 'eDPI (effective Dots Per Inch) is calculated by multiplying your mouse DPI by your in-game sensitivity. It acts as a universal metric allowing you to compare true sensitivities across different games and settings.' },
              { q: 'How often should I use an aim trainer?', a: 'Consistency is key. 15-30 minutes daily is vastly superior to a single 3-hour session once a week. Aim for frequent, focused sessions without causing cognitive fatigue.' },
              { q: 'Can aim training improve my rank?', a: 'Aim training can help elevate your mechanical baseline. However, ranking up also requires strong game sense, positioning, and team communication. Excellent mechanics complement good decision-making.' },
              { q: 'Is wrist aiming or arm aiming better?', a: 'A combination is optimal. Use your arm for large, sweeping movements to protect your wrist, and use your wrist/fingertips for precise micro-adjustments.' },
              { q: 'Does mouse pad surface affect aim?', a: 'Yes. Hard pads offer lower friction for faster flicks, while cloth pads offer more control and stopping power, which many players prefer for tactical shooters.' },
              { q: 'What is "aim shake" and how do I fix it?', a: 'Aim shake often results from a tense grip (deathgripping) or high sensitivity. To fix it, consciously relax your hand, lower your sensitivity if necessary, and ensure proper desk ergonomics.' },
              { q: 'How long does it take to see results?', a: 'While some players feel "warmed up" immediately, structural improvements to your mechanics typically take 2-4 weeks of consistent, daily practice to become noticeable in-game.' },
              { q: 'Should I play with raw input on?', a: 'Yes. Raw input bypasses Windows cursor acceleration, ensuring your sensitivity is perfectly linear at all speeds. You should enable raw input in every competitive FPS.' },
              { q: 'Does playing rhythm games help aim?', a: 'Partially. Rhythm games improve hand-eye coordination and reaction speed, but the transfer is indirect compared to dedicated 3D aim training.' },
              { q: 'How does sleep affect aim?', a: 'Sleep is when motor memories consolidate. Poor sleep measurably degrades reaction time and fine motor precision. Do not expect peak aiming performance if you are sleep-deprived.' },
              { q: 'What is crosshair placement?', a: 'Crosshair placement is pre-aiming your crosshair at the exact height and angle where an enemy is likely to appear, significantly reducing the distance you need to flick.' },
              { q: 'Is higher FOV better for aiming?', a: 'Higher FOV makes targets appear smaller and slower, while lower FOV makes them appear larger but faster. Your aim trainer FOV should exactly match your primary game for accurate muscle memory transfer.' },
              { q: 'Do heavier mice make aiming harder?', a: 'Heavier mice have more inertia, making them harder to start and stop quickly. The competitive standard has largely shifted to lightweight mice (under 70g) for optimal control.' },
              { q: 'How do I use the sniper scope?', a: 'Press 2 to equip the sniper, then right-click to toggle the scope. Scoped shots are perfectly accurate, while hip-firing the sniper is deliberately inaccurate. Your sensitivity is scaled automatically while zoomed in.' },
              { q: 'How does the auto rifle work?', a: 'Press 3 to equip the auto rifle, then hold the left mouse button to fire continuously. It has light recoil and slight spread, so short controlled bursts are more accurate than spraying.' }
            ].map(({ q, a }, i) => (
              <details key={i} style={{ border: '3px solid #000000', borderRadius: '0px', boxShadow: '4px 4px 0 0 #000000', padding: '1rem', marginBottom: '8px' }}>
                <summary style={{ fontSize: '1rem', fontWeight: 900, cursor: 'pointer', textTransform: 'uppercase' }}>
                  {q}
                </summary>
                <div className="a">
                  <p style={{ marginTop: '0.75rem', lineHeight: '1.6', marginBottom: 0, fontWeight: 500, fontSize: '0.96rem' }}>{a}</p>
                </div>
              </details>
            ))}
          </div>
        </section>

        <div style={{ display: 'flex', justifyContent: 'center', gap: '1rem', flexWrap: 'wrap', marginTop: '4rem', padding: '2rem 0', borderTop: '1px solid rgba(255,255,255,0.1)' }}>
          <a href="/cps-test" style={{ color: '#4fc3f7', textDecoration: 'none', fontWeight: 600 }}>CPS Test</a>
          <span style={{ color: '#4b5563' }}>|</span>
          <a href="/reaction-time" style={{ color: '#4fc3f7', textDecoration: 'none', fontWeight: 600 }}>Reaction Time</a>
          <span style={{ color: '#4b5563' }}>|</span>
          <a href="/mouse-accuracy" style={{ color: '#4fc3f7', textDecoration: 'none', fontWeight: 600 }}>Mouse Accuracy</a>
          <span style={{ color: '#4b5563' }}>|</span>
          <a href="/typing-test" style={{ color: '#4fc3f7', textDecoration: 'none', fontWeight: 600 }}>Typing Test</a>
        </div>

        <p style={{ fontSize: '0.8rem', color: '#4b5563', textAlign: 'center', marginTop: '2rem' }}>
          This guide provides actionable insights for competitive players seeking to improve their mechanical skills through targeted practice.
        </p>
      </article>




    </div>
  );
}