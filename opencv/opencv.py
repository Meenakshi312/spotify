import cv2
import mediapipe as mp
mp_hands=mp.solutions.hands
mp_drawing=mp.solutions.drawing_utils
# threshold to detect
hands=mp_hands(min_detection_confidence=0.5,min_tracking_confidence=0.5)
# when detection more that 0.5 it works
# open webcam
# capture from default webcam;0=default
# video capture object
cap=cv2.VideoCapture(0)
while cap.isOpened():
    # check if it is able to capture obj
    # frame=snapshot 30fds=50 frames displayed per sec
    ret,frame =cap.read() #capture a frame (returns ret(if successfull or not),frame(stores numpy array))
    if not ret:
        break
    # convert bgr(blue green red)(open cv reads )to rgb(change format(media pipe) )
    rgb_frame=cv2.cvtColor(frame,cv2.COLOR_BGR2RGB)
    # Process the frame
    results=hands.process(rgb_frame)
    # hand and land marks and also store if left hand or right hand
    # draw the landmarks iff hands are detected
    if results.multi_hand_landmarks:
        for hand_landmarks in results.multi_hand_landmarks:
            mp_drawing.draw_landmarks(frame,hand_landmarks,mp_hands.HAND_CONNECTIONS)
            # FRAME=DETECTED,HAND_LA=NO OF LANDMARKS,DRAW LANDMARKS=TO CONNECT LANDMARKS
            # Displaying 
            cv2.imshow('Hand tarcking',frame)
            # to wait to press a key ord=uses ascii value
            if cv2.waitKey(1) & 0xFF==ord('q'):
                # breakto relase
                cap.release()
cv2.destroyAllWindows()
pip install mediapipe
