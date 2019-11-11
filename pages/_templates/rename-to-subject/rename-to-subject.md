---
# ---------------------------------------------------------------------------
# This area is called the front matter, which is metadata about the document.
# Each row below is a field of the front matter.
# I have put example inputs below. Please replace these with your own values.

# ---------------------------------------------------------------------------
# EXPLANATIONS:

# layout - Always "post" - Sets the HTML template that the page will use
# title - Subject Title
# description - A Description of the Subject
# field-guide - If this is part of a field guide, the name of the field guide
# category - The catagory - which can be Platforms, Principles, Processes, and Projects 
# subcategory - The subcatagory, which could be the Subject name or a group name
# order - An integer (ex: 1) that forces this page to be ordered in the navigation list
# author - The author - which is you!

# ---------------------------------------------------------------------------
# CONFIGURE ME:

layout: post
title: Field Guide Post Template
description: Copy and paste me to add a post to the field guides
field-guide: Field Guide 
category: Processes
subcategory: Post Template
order: 1
author: Leland Jobson
---

Here you introduce your subject of the field guide in 1-3 paragraphs. As you'll see below - Field Guides are constructed out of blocks. Blocks are containers of information that contain a title, one or more paragraphs of explaination and expansion on that title or related information. Blocks begin and end with header breaks, which in markdown look like "---". The title is always an H2 header, which has two "## symbols. The  This particular block is an explanitory block, the purpose of which is to explain something. 

There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words which don't look even slightly believable. If you are going to use a passage of Lorem Ipsum, you need to be sure there isn't anything embarrassing hidden in the middle of text. All the Lorem Ipsum generators on the Internet tend to repeat predefined chunks as necessary, making this the first true generator on the Internet. It uses a dictionary of over 200 Latin words, combined with a handful of model sentence structures, to generate Lorem Ipsum which looks reasonable. The generated Lorem Ipsum is therefore always free from repetition, injected humour, or non-characteristic words etc.

---

## This is an explanitory block

This is text beneath the block. If text surpasses a paragraph, the second paragraph should continue beneath the below image. It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English.

![](./images/Head.PNG)

The above is the best way to reference in an image. Notice that the folder that this template is written in has an "images" folder. If you put your image in there, then you can reference in your image with the relative path "./images/my-image-name.extension". There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words which don't look even slightly believable. If you are going to use a passage of Lorem Ipsum, you need to be sure there isn't anything embarrassing hidden in the middle of text. All the Lorem Ipsum generators on the Internet tend to repeat predefined chunks as necessary, making this the first true generator on the Internet. It uses a dictionary of over 200 Latin words, combined with a handful of model sentence structures, to generate Lorem Ipsum which looks reasonable. The generated Lorem Ipsum is therefore always free from repetition, injected humour, or non-characteristic words etc.

---

## This is a follow along block

This block contains follow-along instructions. Steps should be formatted in the following way:

### 1. Create a something.
<img src="./images/Head.png" style="float: right;" width="30%">
The contents of step one go here. Note that I've added a thumbnail image to accompany this step. If there are substeps:
1. First do this.
2. Then do this.

If there are additional notes:
- Keep this in mind.
- Also keep this in mind.

### 2. Create another thing.

The contents of step two go here. If there are substeps:
1. First do this.
2. Then do this.

If there are additional notes:
- Keep this in mind.
- Also keep this in mind.

### 3. Final step

The contents of step two go here. If there are substeps:
1. Just do this.

<div class="alert alert-success">At the end of every how-to, we put in a Success block.</div>