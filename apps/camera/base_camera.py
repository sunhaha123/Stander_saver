import cv2
import numpy as np
from camera.test import calibration



class Camera1(object):
    """ 通过opencv读取摄像头242"""

    def __init__(self):
        self.url = r'/home/ps/Video_data/hongkou/jiushengyuan/2021-03-29/192.168.7.101_01.mp4'
        self.cap = cv2.VideoCapture(self.url)
        self.screen = 242


    # def __del__(self):
    #     self.cap.close()

    def get_frame(self):
        flag, frame = cv2.VideoCapture(self.url).read()
        frame = calibration(frame)
        assert flag
        flag, jpg = cv2.imencode('.jpg', frame)
        assert flag
        return np.array(jpg).tostring()
    #
    def get_origin_frame(self):
        ret, frame =  self.cap.read()# frame shape 640*480*3
        if ret != True:
                print('video  is  break!')
        return frame

class Camera2(object):
    """ 通过opencv读取摄像头243"""

    def __init__(self):
        self.url = r'/home/ps/Video_data/hongkou/jiushengyuan/2021-03-29/192.168.7.102_01.mp4'
        self.cap = cv2.VideoCapture(self.url)
        self.screen = 243

    def get_frame(self):
        flag, frame = self.cap.read()
        frame = calibration(frame)
        assert flag
        flag, jpg = cv2.imencode('.jpg', frame)
        assert flag
        return np.array(jpg).tostring()

    def get_origin_frame(self):
        ret, frame = self.cap.read()  # frame shape 640*480*3
        if ret != True:
                print('video  is  break!')
        return frame

class Camera3(object):
    """ 通过opencv读取摄像头244"""

    def __init__(self):
        self.url = r'/home/ps/Video_data/hongkou/jiushengyuan/2021-03-29/192.168.7.103_01.mp4'
        self.cap = cv2.VideoCapture(self.url)
        self.screen = 244

    def get_frame(self):
        flag, frame = self.cap.read()
        frame = calibration(frame)
        assert flag
        flag, jpg = cv2.imencode('.jpg', frame)
        assert flag
        return np.array(jpg).tostring()

    def get_origin_frame(self):
        ret, frame = self.cap.read()  # frame shape 640*480*3
        if ret != True:
                print('video  is  break!')
        return frame

class Camera4(object):
    """ 通过opencv读取摄像头245"""

    def __init__(self):
        self.url = r'/home/ps/Video_data/hongkou/jiushengyuan/2021-03-29/192.168.7.104_01.mp4'
        self.cap = cv2.VideoCapture(self.url)
        self.screen = 245

    def get_frame(self):
        flag, frame = self.cap.read()
        frame = calibration(frame)
        assert flag
        flag, jpg = cv2.imencode('.jpg', frame)
        assert flag
        return np.array(jpg).tostring()

    def get_origin_frame(self):
        ret, frame = self.cap.read()  # frame shape 640*480*3
        if ret != True:
                print('video  is  break!')
        return frame

if __name__ == "__main__":
    camera_test = Camera1()
    for i in range(40):
        print(camera_test.get_frame())

