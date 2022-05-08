<template>
  <aplayer class="pla" :audio="audio" />
</template>

<script>
import Vue from 'vue'
import APlayer from '@moefe/vue-aplayer'
import {dirMusicList} from "../api/website";
//https://aplayer.netlify.app/docs/guide/options.html#lrctype
Vue.use(APlayer, {
  defaultCover: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSy_130iiorSSjF1RWgNBX7qy3evKv2HKsH0g&usqp=CAU',
  productionTip: true,
});
export default {
  name: "mk-aplayer",
  data() {
    return {
      temp:[
        {
          name: "听妈妈的话",
          artist: "周杰伦",
          url:
            "http://www.170mv.com/kw/antiserver.kuwo.cn/anti.s?rid=MUSIC_138243&response=res&format=mp3|aac&type=convert_url&br=128kmp3&agent=iPhone&callback=getlink&jpcallback=getlink.mp3",
          cover: 'http://img1.kuwo.cn/star/starheads/240/42/97/3914752958.jpg', // prettier-ignore
          lrc:
            "[00:11.64]小朋友 你是否有很多问号 \n[00:14.26]为什么 别人在那看漫画 \n[00:16.89]我却在学画画 对这钢琴说话 \n[00:19.37]别人在玩游戏 我却靠在墙壁背我的ABC \n[00:22.38]我说我要一架大大的飞机 \n[00:24.91]我却得到一只旧旧螺旋机 \n[00:27.48]为什么要听妈妈的话 \n[00:29.79]长大后你就会开始懂得这段话 哼 \n[00:32.26]长大后我开始明白 \n[00:35.23]为什么我 跑得比别人快 \n[00:36.64]飞得比别人高 \n[00:37.88]将来大家看的都是我画的漫画 \n[00:40.23]大家唱的都是 我写的歌 \n[00:42.95]妈妈的辛苦 不让你看见 \n[00:45.57]温暖的事都在她心里面 \n[00:48.01]有空就得多摸摸她的手 \n[00:50.70]把手牵着一起梦游 \n[00:53.10]听妈妈的话 别让她受伤 \n[01:03.14]想快快长大 才能保护她 \n[01:12.93]美丽的白发 幸福中发芽 \n[01:23.96]天使的魔法 温暖中慈祥 \n[01:34.43]在你的未来 音乐是你的王牌 \n[01:36.21]那王牌谈的恋爱 \n[01:37.68]而我不想把你教坏 \n[01:39.21]还是听妈妈的话吧 \n[01:40.52]晚点在恋爱吧 \n[01:41.96]我知道你未来的路 \n[01:44.09]干嘛比我更清楚 \n[01:45.40]你因为太多学习的同学 \n[01:46.53]在这块写东写西 \n[01:47.50]但我建议最好听妈妈 \n[01:49.10]我会用功读书 \n[01:50.23]用功读书怎么会从我嘴巴说出 \n[01:52.34]不想你输所以要叫你用功读书 \n[01:55.47]妈妈挑给你的毛病你要好好的收着 \n[01:57.56]因为不知道是我要告诉她我还留着 \n[01:59.91]对了 我会遇到了周润发 \n[02:02.31]所以你可以跟同学炫耀 \n[02:03.38]赌神未来是你爸爸 \n[02:04.47]我找不到你写的情书 \n[02:06.94]你喜欢的要承认 \n[02:08.02]因为我会了解你会在操场上牵她 \n[02:09.40]你会开始喜欢唱流行歌 \n[02:12.81]因为张学友开始准备唱吻别 \n[02:15.43]听妈妈的话 别让她受伤 \n[02:26.22]想快快长大 才能保护她 \n[02:36.16]美丽的白发 幸福中发芽 \n[02:46.66]天使的魔法 温暖中慈祥 \n[02:56.68]听妈妈的话 别让她受伤 \n[03:07.46]想快快长大 才能保护她 \n[03:17.27]长大后我开始明白 为什么我 \n[03:20.81]跑得比别人快 飞得比别人高 \n[03:22.56]将来大家看的都是我画的漫画 \n[03:25.52]大家唱的都是我写的歌 \n[03:28.31]妈妈的辛苦她不让你看见 \n[03:30.72]温暖的事都在她心里面 \n[03:33.31]有空就得多摸摸她的手 \n[03:36.15]把手牵着一起梦游 \n[03:38.34]听妈妈的话 别让她受伤 \n[03:48.72]想快快长大 才能保护她 \n[03:59.10]美丽的白发 幸福中发芽 \n[04:09.32]天使的魔法 温暖中慈祥",
        },
        {
          name: "纯音乐",
          artist: "-",
          url: "http://f3.htqyy.com/play9/900/mp3/6",
          cover: '', // prettier-ignore
          lrc: ''
        },
        {
          name: "Wayward One",
          artist: "Jillian Rae",
          url:
            "http://www.170mv.com/kw/antiserver.kuwo.cn/anti.s?rid=MUSIC_72217588&response=res&format=mp3|aac&type=convert_url&br=128kmp3&agent=iPhone&callback=getlink&jpcallback=getlink.mp3",
          cover: 'https://p1.music.126.net/K0-IPcIQ9QFvA0jXTBqoWQ==/109951163636756693.jpg?param=300y300', // prettier-ignore
          lrc: "",
        },
      ],
      audio: [],
    };
  },
  created() {
    this.getDataList()
  },
  methods: {
    getDataList() {
      dirMusicList().then(res => {
        let temp = res.data
        for (const re of temp) {
          re.artist = re.author
          this.audio.push(re)
        }
      })
    }
  }
}
</script>

<style scoped>
.pla {
  /*width: 100%;*/
  max-width: 700px;
  margin: 10px auto;
  border-radius: 5px
}
</style>
