from django.shortcuts import render
# views.py
from django.shortcuts import render
from django.http import StreamingHttpResponse
# Create your views here.
from django.views.generic import  View
from django.http import HttpResponse
# 导入刚刚写好的类
from .base_camera import Camera1, Camera2, Camera3, Camera4
from .baidu_api_people_detect import body_analysis
from django.views.decorators.csrf import csrf_exempt
import cv2
import numpy as np
import time
import json
# redis
from django_redis import get_redis_connection
conn = get_redis_connection('default')
conn.set('c1_x1',0)
conn.set('c1_y1',0)
conn.set('c1_x2',0)
conn.set('c1_y2',0)
conn.set('c1_num',0)
#
conn.set('c2_x1',0)
conn.set('c2_y1',0)
conn.set('c2_x2',0)
conn.set('c2_y2',0)
conn.set('c2_num',0)
#
conn.set('c3_x1',0)
conn.set('c3_y1',0)
conn.set('c3_x2',0)
conn.set('c3_y2',0)
conn.set('c3_num',0)
#
conn.set('c4_x1',0)
conn.set('c4_y1',0)
conn.set('c4_x2',0)
conn.set('c4_y2',0)
conn.set('c4_num',0)

def gen1(camera):
    """视频流生成器功能。"""
    while True:
        # 读取图片
        ret, frame = camera.cap.read()
        # 截图
        frame = frame[118:536, 806:1618]
        # 画图

        if int(time.time()) % 5 == 0:
            x1, y1, x2, y2, frame, status, message = body_analysis(frame)
            conn.set('c1_x1', x1)
            conn.set('c1_y1', y1)
            conn.set('c1_x2', x2)
            conn.set('c1_y2', y2)
        x1 = int(conn.get('c1_x1').decode())
        y1 = int(conn.get('c1_y1').decode())
        x2 = int(conn.get('c1_x2').decode())
        y2 = int(conn.get('c1_y2').decode())
        cv2.rectangle(frame, (x1, y1), (x2, y2), (255, 0, 0), 2)
        # 统计人数
        if x1==0:
            conn.set('c1_num', 0)
        else:
            conn.set('c1_num', 1)
        # 将图片进行解码
        flag, jpg = cv2.imencode('.jpg', frame)  #宽长
        rframe = np.array(jpg).tostring()
        time.sleep(0.02)
        yield (b'--frame\r\n'
               b'Content-Type: image/jpeg\r\n\r\n' + rframe + b'\r\n')


def gen2(camera):
    """视频流生成器功能。"""
    while True:
        ret, frame = camera.cap.read()
        # 截图
        frame = frame[246:620,712:1450]
        # 画图
        if int(time.time()) % 6 == 0:
            x1, y1, x2, y2, frame, status, message = body_analysis(frame)
            conn.set('c2_x1', x1)
            conn.set('c2_y1', y1)
            conn.set('c2_x2', x2)
            conn.set('c2_y2', y2)
        x1 = int(conn.get('c2_x1').decode())
        y1 = int(conn.get('c2_y1').decode())
        x2 = int(conn.get('c2_x2').decode())
        y2 = int(conn.get('c2_y2').decode())
        cv2.rectangle(frame, (x1, y1), (x2, y2), (255, 0, 0), 2)
        # 统计人数
        if x1 == 0:
            conn.set('c2_num', 0)
        else:
            conn.set('c2_num', 1)
        flag, jpg = cv2.imencode('.jpg', frame)
        rframe = np.array(jpg).tostring()
        time.sleep(0.028)
        yield (b'--frame\r\n'
               b'Content-Type: image/jpeg\r\n\r\n' + rframe + b'\r\n')

def gen3(camera):
    """视频流生成器功能。"""
    while True:
        ret, frame = camera.cap.read()
        # 截图
        frame = frame[154:534, 1114:1908]
        # 画图
        if int(time.time()) % 8 == 0:
            x1, y1, x2, y2, frame, status, message = body_analysis(frame)
            conn.set('c3_x1', x1)
            conn.set('c3_y1', y1)
            conn.set('c3_x2', x2)
            conn.set('c3_y2', y2)
        x1 = int(conn.get('c3_x1').decode())
        y1 = int(conn.get('c3_y1').decode())
        x2 = int(conn.get('c3_x2').decode())
        y2 = int(conn.get('c3_y2').decode())
        cv2.rectangle(frame, (x1, y1), (x2, y2), (255, 0, 0), 2)
        # 统计人数
        if x1 == 0:
            conn.set('c3_num', 0)
        else:
            conn.set('c3_num', 1)
        flag, jpg = cv2.imencode('.jpg', frame)
        rframe = np.array(jpg).tostring()
        time.sleep(0.028)
        yield (b'--frame\r\n'
               b'Content-Type: image/jpeg\r\n\r\n' + rframe + b'\r\n')

def gen4(camera):
    """视频流生成器功能。"""
    while True:
        ret, frame = camera.cap.read()
        # 截图
        frame = frame[106:484,794:1600]
        # 画图
        if int(time.time()) % 10 == 0:
            x1, y1, x2, y2, frame, status, message = body_analysis(frame)
            conn.set('c4_x1', x1)
            conn.set('c4_y1', y1)
            conn.set('c4_x2', x2)
            conn.set('c4_y2', y2)
        x1 = int(conn.get('c4_x1').decode())
        y1 = int(conn.get('c4_y1').decode())
        x2 = int(conn.get('c4_x2').decode())
        y2 = int(conn.get('c4_y2').decode())
        cv2.rectangle(frame, (x1, y1), (x2, y2), (255, 0, 0), 2)
        # 统计人数
        if x1 == 0:
            conn.set('c4_num', 0)
        else:
            conn.set('c4_num', 1)
        flag, jpg = cv2.imencode('.jpg', frame)
        rframe = np.array(jpg).tostring()
        time.sleep(0.028)
        yield (b'--frame\r\n'
               b'Content-Type: image/jpeg\r\n\r\n' + rframe + b'\r\n')



class IndexView(View):
    @csrf_exempt
    def dispatch(self, request, *args, **kwargs):
        return super(IndexView, self).dispatch(request, *args, **kwargs)

    def get(self, request):
        return render(request, 'camera/index4.html')

    def post(self, request):
        normal = int(conn.get('c1_num').decode())+int(conn.get('c2_num').decode())+\
                 int(conn.get('c3_num').decode())+int(conn.get('c4_num').decode())
        status_dict = {'code': '0', 'normal': '%s'%str(normal), 'alarm': '0', 'msg': '0'}
        return HttpResponse(content=json.dumps(status_dict), content_type='application/json')


class video_1(View):
    @csrf_exempt
    def dispatch(self, request, *args, **kwargs):
        return super(video_1, self).dispatch(request, *args, **kwargs)

    def get(self, request):
        """
        视频流路由。将其放入img标记的src属性中。
        例如：<img src='http://your_ip:port/camera/video_feed/' >
        """
        # 此处应用使用StreamingHttpResponse，而不是用HttpResponse
        camera1 = Camera1()
        return StreamingHttpResponse(gen1(camera1),
                                     content_type='multipart/x-mixed-replace; boundary=frame')


class video_2(View):
    @csrf_exempt
    def dispatch(self, request, *args, **kwargs):
        return super(video_2, self).dispatch(request, *args, **kwargs)

    def get(self, request):
        """
        视频流路由。将其放入img标记的src属性中。
        例如：<img src='http://your_ip:port/camera/video_feed/' >
        """
        # 此处应用使用StreamingHttpResponse，而不是用HttpResponse
        camera2 = Camera2()
        return StreamingHttpResponse(gen2(camera2),
                                     content_type='multipart/x-mixed-replace; boundary=frame')

class video_3(View):
    @csrf_exempt
    def dispatch(self, request, *args, **kwargs):
        return super(video_3, self).dispatch(request, *args, **kwargs)

    def get(self, request):
        """
        视频流路由。将其放入img标记的src属性中。
        例如：<img src='http://your_ip:port/camera/video_feed/' >
        """
        # 此处应用使用StreamingHttpResponse，而不是用HttpResponse
        camera3 = Camera3()
        return StreamingHttpResponse(gen3(camera3),
                                     content_type='multipart/x-mixed-replace; boundary=frame')

class video_4(View):
    @csrf_exempt
    def dispatch(self, request, *args, **kwargs):
        return super(video_4, self).dispatch(request, *args, **kwargs)

    def get(self, request):
        """
        视频流路由。将其放入img标记的src属性中。
        例如：<img src='http://your_ip:port/camera/video_feed/' >
        """
        # 此处应用使用StreamingHttpResponse，而不是用HttpResponse
        camera4 = Camera4()
        return StreamingHttpResponse(gen4(camera4),
                                     content_type='multipart/x-mixed-replace; boundary=frame')
