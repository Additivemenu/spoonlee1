混合模式：元素的内容应该与元素的直系父元素的内容和元素的背景如何混合

| 混合模式六大类 | 混合模式类型 | background-blend-mode | mix-blend-mode |
| --- | --- | --- | --- |
| （一）覆盖组 | normal（默认值。设置正常的混合模式） | ✅ | ✅ |
| （二）去亮组 | darken（变暗模式） | ✅ | ✅ |
| - | multiply（正片叠底模式） | ✅ | ✅ |
| - | color-burn（颜色加深模式） | ✅ | ✅ |
| （三）去暗组 | lighten（变亮模式） | ✅ | ✅ |
| - | plus-lighter（类似于亮色,但对中色调的影响更大） | ❌ | ✅ |
| - | screen（滤色模式） | ✅ | ✅ |
| - | color-dodge（颜色减淡模式） | ✅ | ✅ |
| （四）对比组 | overlay（叠加模式） | ✅ | ✅ |
| - | soft-light（柔光模式） | ✅ | ✅ |
| - | hard-light（强光模式） | ✅ | ✅ |
| （五）差值组 | difference（差值模式） | ✅ | ✅ |
| - | exclusion（排除模式） | ✅ | ✅ |
| （六）色彩组 | hue（色调混合模式） | ✅ | ✅ |
| - | saturation（饱和度模式） | ✅ | ✅ |
| - | color（颜色模式） | ✅ | ✅ |
| - | luminosity（亮度模式） | ✅ | ✅ |

![image.png](https://cdn.nlark.com/yuque/0/2023/png/647071/1703578328683-c442b1e1-a2ba-4959-a069-efa1c6b552db.png#averageHue=%23fefefe&clientId=u07791c62-9e0c-4&from=paste&height=511&id=u6b550278&originHeight=511&originWidth=1117&originalType=binary&ratio=1&rotation=0&showTitle=false&size=162140&status=done&style=none&taskId=ue933ebb0-05d6-454a-8fe9-6ae6ff4c0d4&title=&width=1117)
![image.png](https://cdn.nlark.com/yuque/0/2023/png/647071/1703578458612-75a3142b-633b-4605-869b-878b794f7848.png#averageHue=%23faf9f9&clientId=u07791c62-9e0c-4&from=paste&height=569&id=uc99ab0bf&originHeight=569&originWidth=1131&originalType=binary&ratio=1&rotation=0&showTitle=false&size=160895&status=done&style=none&taskId=u70bfe70c-27da-4c85-9e20-0ae4f89ad03&title=&width=1131)

1. **normal：** 默认值。内容不与背景混合。单纯的覆盖
2. ** darken（变暗）：**两张图在一起，谁亮就把谁丢了。（黑 + 灰） 得到的就是黑，黑色更暗

![image.png](https://cdn.nlark.com/yuque/0/2023/png/647071/1703580022301-e2b3aa38-8a39-490a-94aa-426c95fc475f.png#averageHue=%23f5f5f5&clientId=u07791c62-9e0c-4&from=paste&height=41&id=u96b7e816&originHeight=41&originWidth=139&originalType=binary&ratio=1&rotation=0&showTitle=false&size=1092&status=done&style=none&taskId=u9f731944-f7d7-49b7-96dd-07f85e7bb0b&title=&width=139)

3. **multiply(正片叠底) **: 图会更暗 （黑 + 任何 = 黑，白 + 任何 = 任何）

![image.png](https://cdn.nlark.com/yuque/0/2023/png/647071/1703580152599-d642951d-50de-4844-a0f4-1b14dcd5889b.png#averageHue=%23f8f8f8&clientId=u07791c62-9e0c-4&from=paste&height=74&id=u836a7ecf&originHeight=74&originWidth=115&originalType=binary&ratio=1&rotation=0&showTitle=false&size=1168&status=done&style=none&taskId=ud6db3589-5921-41ae-b046-35ca69b74f3&title=&width=115)

4. **color-burn（颜色加深）**：暗的地方会变暗，甚至变黑，亮的地方不变，用的比较少 

![image.png](https://cdn.nlark.com/yuque/0/2023/png/647071/1703580071890-234aee6e-d76e-4288-a597-a3fa3c2021b8.png#averageHue=%23f7f7f7&clientId=u07791c62-9e0c-4&from=paste&height=73&id=ua0efe815&originHeight=73&originWidth=268&originalType=binary&ratio=1&rotation=0&showTitle=false&size=2109&status=done&style=none&taskId=ud5babd37-68ac-4a32-9003-ef302716c57&title=&width=268)

5. **lighten（变亮模式**）：两张图在一起，谁暗就把谁丢了， 与darken模式相反

![image.png](https://cdn.nlark.com/yuque/0/2023/png/647071/1703580038727-35fb188a-731f-4bb8-b964-6793ff6e615f.png#averageHue=%23f5f5f5&clientId=u07791c62-9e0c-4&from=paste&height=43&id=u9f95d5fd&originHeight=43&originWidth=144&originalType=binary&ratio=1&rotation=0&showTitle=false&size=1210&status=done&style=none&taskId=u57c02548-63e2-41a9-92ca-ece6d308072&title=&width=144)

6. **screen（滤色模式）**：整体颜色变亮（滤白得白，滤黑无效）

![image.png](https://cdn.nlark.com/yuque/0/2023/png/647071/1703579976779-6460dcbe-b589-423e-b175-b84c97ee64be.png#averageHue=%23f7f7f7&clientId=u07791c62-9e0c-4&from=paste&height=66&id=u101256a3&originHeight=66&originWidth=340&originalType=binary&ratio=1&rotation=0&showTitle=false&size=2260&status=done&style=none&taskId=u664e4635-7403-4124-8815-01ebbf80c8c&title=&width=340)

7. **color-dodge（颜色减淡模式）**：亮的更亮，暗的不管

![image.png](https://cdn.nlark.com/yuque/0/2023/png/647071/1703580456050-50d2ad57-dfdf-4a25-bb76-0bd747ccccfa.png#averageHue=%23f8f8f8&clientId=u07791c62-9e0c-4&from=paste&height=80&id=u11c99256&originHeight=72&originWidth=226&originalType=binary&ratio=1&rotation=0&showTitle=false&size=1908&status=done&style=none&taskId=ud5042738-e3d6-4627-9dc4-4fa126cd291&title=&width=251.111117763284)

8. **overlay（叠加模式）： **亮的更亮，暗的更暗（正片叠底和滤色的后代）

![image.png](https://cdn.nlark.com/yuque/0/2023/png/647071/1703580431427-0214d992-af52-4331-bbdb-c2123c4f3619.png#averageHue=%23fdfcfc&clientId=u07791c62-9e0c-4&from=paste&height=242&id=u68e75dcc&originHeight=218&originWidth=664&originalType=binary&ratio=1&rotation=0&showTitle=false&size=8151&status=done&style=none&taskId=u11b09f55-f5bc-427b-b83c-010188cbc6b&title=&width=737.777797322215)

9. hard-light(强光模式)

![image.png](https://cdn.nlark.com/yuque/0/2023/png/647071/1703580497644-1bc7c4f2-24dd-4ab0-88a6-ebfea4451b39.png#averageHue=%23fcfcfc&clientId=u07791c62-9e0c-4&from=paste&height=237&id=ufd0230cb&originHeight=213&originWidth=616&originalType=binary&ratio=1&rotation=0&showTitle=false&size=7927&status=done&style=none&taskId=ubeba33f1-b787-4130-8d54-280d79b5abe&title=&width=684.4444625760307)
公式一样，取决于顺序。 

10. soft-light（柔光模式）：会更柔和

![image.png](https://cdn.nlark.com/yuque/0/2023/png/647071/1703580507795-2a9f2231-1d56-401a-890f-d7ef98c98e99.png#averageHue=%23fcfcfc&clientId=u07791c62-9e0c-4&from=paste&height=246&id=Nv49W&originHeight=221&originWidth=712&originalType=binary&ratio=1&rotation=0&showTitle=false&size=10092&status=done&style=none&taskId=ucc170ea5-4e4b-4268-be59-b3e66788f18&title=&width=791.1111320683991)

11. difference（差值模式）

![image.png](https://cdn.nlark.com/yuque/0/2023/png/647071/1703580911966-048c2aa6-4b67-495e-b804-5a8e22c51851.png#averageHue=%23f9f9f9&clientId=u07791c62-9e0c-4&from=paste&height=53&id=u9dd7fff0&originHeight=48&originWidth=145&originalType=binary&ratio=1&rotation=0&showTitle=false&size=967&status=done&style=none&taskId=u09fce323-a899-417f-ac6d-d054a1429a3&title=&width=161.11111537909812)

12. hue（色相混合模式） ： 不改变饱和度和亮度
13. saturation（饱和度模式）：不改变色相和亮度
14. color（颜色模式）：同时改变色相和饱和度 
15. luminosity（亮度模式） ：只控制亮度不修改色相和饱和度
