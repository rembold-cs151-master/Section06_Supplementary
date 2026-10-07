---
title: "Section 06: Student Applets"
author: Jed Rembold and Eric Roberts
date: "Week of October 5th"
slideNumber: true
theme: python_catppuccin
highlightjs-theme: catppuccin-mocha
width: 1920
height: 1080
transition: fade
css:
  - css/codetrace.css
  - css/roberts.css
  - DrawYinYangLayers.css
tracejs:
  - DrawYinYangLayers
  - StampSim
extrajs:
  - js/pgl.js
---



## Yin-Yang {data-state="DrawYinYangLayersTrace"}
<table style="margin:auto;">
<tbody style="border:none; background-color:#1e1e2e;">
<tr style="border:none; background-color:#1e1e2e; padding:0px;">
<td colspan=2 style="border:none; background-color:#1e1e2e; padding:0px;">
<div id="DrawYinYangCanvas" class="CTCanvas"
     style="border:none; background-color:#1e1e2e;"></div>
</td>
</tr>
<tr>
<td style="text-align:center; width:948px;">
<table class="CTControlStrip">
<tbody>
<tr>
<td>
<img id=DrawYinYangResetButton
     style="width:100px;"
     src="images/Reset.png"
     alt="ResetButton" />
</td>
<td>
<img id=DrawYinYangToggleDotsButton
     style="width:100px;"
     src="images/ToggleDotsControl.png"
     alt="ToggleDotsButton" />
</td>
</tr>
</tbody>
</table>
</td>
</tr>
</tbody>
</table>


## Stamper {data-state="StampSimTrace"}
<div id="StampCanvas" class="CTCanvas"
     style="border:none; background-color:white; width:100%; height:800px;"></div>


