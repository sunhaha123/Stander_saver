"""Stander URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/1.9/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  url(r'^$', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  url(r'^$', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.conf.urls import url, include
    2. Add a URL to urlpatterns:  url(r'^blog/', include('blog.urls'))
"""
from django.conf.urls import url



from apps.camera.views import  IndexView,video_1,video_2,video_3,video_4

urlpatterns = [
    # url(r'^xadmin/', xadmin.site.urls),
    url('^$', IndexView.as_view(), name='index'),
    # url(r'^media/(?P<path>.*)$', serve, {"document_root":MEDIA_ROOT}),

    url(r'^video_feed1$', video_1.as_view(),name='video_1'),
    url(r'^video_feed2$', video_2.as_view(),name='video_2'),
    url(r'^video_feed3$', video_3.as_view(),name='video_3'),
    url(r'^video_feed4$', video_4.as_view(),name='video_4'),
    # url(r'^marquee/', views.status_feed1,name="status_feed1"),
    # url(r'^marquee/', views.status_feed1,name="status_feed1"),
    # url(r'^stream/', views.test_stream, name='test_stream'),

]
