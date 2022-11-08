# PeerPrep ✏️

[PeerPrep](https://frontend-swougile5q-uc.a.run.app/#/login) is an online, collaborative coding platform that allows you to prepare for coding assessments with a friend or a stranger. PeerPrep contains a myriad of coding interview questions that are designed to put your data structures & algorithms knowledge to the test. PeerPrep also provides a **collaborative text editor** and a **voice chat** to faciliate discussions with your peer!

# How to use? 🚦

## Sign Up ✋
Sign up for an account at the [registration page](https://frontend-swougile5q-uc.a.run.app/#/login).

![image](https://user-images.githubusercontent.com/61351392/200508676-b72b5cce-a69d-4b4d-8290-a5fbf713b51c.png)

After registering, navigate to the Log In page and login.

## Select Difficulty :arrow_up:
When you are logged in, select a difficulty level.

For example, we indicate that we want to be matched on a question with **Medium** difficulty.

![image](https://user-images.githubusercontent.com/61351392/200509487-837c424d-0403-43ae-9dfc-d6c4a45019c3.png)

## Find Match :loudspeaker:
Click on "Match" to start searching for a peer to prepare for your coding interview!

![image](https://user-images.githubusercontent.com/61351392/200510675-2d1393ab-16cb-4039-87ec-a45394eb25c7.png)

## After Matched :two_men_holding_hands:
![image](https://user-images.githubusercontent.com/61351392/200511140-67380655-b2a1-4195-9b96-0a2caef8258a.png)

### Toggle between Programming Languages :twisted_rightwards_arrows:

You can choose your desired language by toggling between `Java`, `JavaScript` and `Python`.

JavaScript             |   Java     |          Python
:-------------------------:|:-------------------------:|:-------------------------:
![image](https://user-images.githubusercontent.com/61351392/200511723-041bf0a3-02b6-4c3e-b720-bb8efb38a47c.png)  |  ![image](https://user-images.githubusercontent.com/61351392/200512807-5538ed96-0fb4-426a-bcf7-87aa1816ead3.png) | ![image](https://user-images.githubusercontent.com/61351392/200512967-ab354e80-6826-4794-9664-06253283010c.png)

### Toggle between Color Themes :twisted_rightwards_arrows:

Monokai             |   Tomorrow     |          Terminal
:-------------------------:|:-------------------------:|:-------------------------:
![image](https://user-images.githubusercontent.com/61351392/200513586-43f4ac11-daf6-4262-81e2-310f07c2b4e3.png) |  ![image](https://user-images.githubusercontent.com/61351392/200513688-8e72bfb4-09dc-485c-a1ea-875f85d1399a.png) | ![image](https://user-images.githubusercontent.com/61351392/200513793-c8c917b0-2d4f-4e58-af15-eb55aa7083f8.png)

### Connect to voice :microphone:

If you'd like to, you can allow PeerPrep to access your microphone for voice collaboration with your Peer.

![image](https://user-images.githubusercontent.com/61351392/200529631-fd9955e6-752f-4c65-8417-bb4a0ad804e4.png)


### Edit together, in real time :rocket:

![image](https://user-images.githubusercontent.com/61351392/200530310-dc2e0fdd-900d-4837-85d5-7c927960fa0e.png)

### Compile and run your code :hammer: :running:

Click on "Run Code" to compile your current code.

![image](https://user-images.githubusercontent.com/61351392/200531430-a0f8c652-3040-4256-9ff7-b8d926e8c30d.png)

Example: Compiling and running in Java

![image](https://user-images.githubusercontent.com/61351392/200549508-fc36d16a-729c-4ff2-92cb-4a35d0a25ac0.png)


## End Session :checkered_flag:

Click on "Exit Session" to exit the session when you are done.

![image](https://user-images.githubusercontent.com/61351392/200531356-67a9b12c-f7e7-44fb-b7d5-4d1df11a4537.png)



<br/>

## What if you forgot your ![image](https://user-images.githubusercontent.com/61351392/200607856-4d2864ab-be6c-4f24-a4a8-d923a45937be.png)
passcode :frowning:

### Fill up the Forget Password Form :smile:
![image](https://user-images.githubusercontent.com/61351392/200604972-cc428deb-8b46-4ed8-97ee-c618c8b02008.png)

### Check your email to reset 📫
![image](https://user-images.githubusercontent.com/61351392/200605834-723db486-4f19-4b82-8342-9db4ec8f0a55.png)




<br/>



# Instructions to set up PeerPrep locally (Alternative):

1) Clone this repository.
2) Download and insert *.env [files](https://drive.google.com/drive/folders/1KxUd3-2lc4JIn_M_GqeS9pQX_nGJxZYW?usp=sharing) into the microservices directories respectively.
3) Rename the *.env files to just .env
4) Open each .env file. Replace the variables surrounded by << >> with the respective information.
5) cd into each of the microservices directory and run `npm i`, you should have 6 terminals opened (total 6 microservices).
6) Run `npm start` on each of the terminal.
7) You are ready to use PeerPrep locally!

**Note:** questions are not fetched from localhost since the local database would be empty and you would have to insert questions manually. For convenience,
only the question service is hosted in the cloud and all other microservices can be ran locally.


