from deepface import DeepFace
import cv2

image_path = 'img1.jpg'
image = cv2.imread(image_path)

if image is None:
    print("Error: Unable to read image")
    exit()

try:
    result = DeepFace.analyze(image, actions=['emotion'])

    print("\nResult:")
    print(result)

    highest_emotion = (None, 0)

    for face in result:
        emotions = face['emotion']
        dominant = max(emotions.items(), key=lambda x: x[1])
        
        if dominant[1] > highest_emotion[1]:
            highest_emotion = dominant

    print("\nDominant Emotion:")
    if highest_emotion[1] > 50:
        print(f"{highest_emotion[0]} ({highest_emotion[1]:.2f}%)")
    else:
        print("No strong dominant emotion detected.")

except Exception as e:
    print(f"Error: {e}")

    # to know more emotions

                        