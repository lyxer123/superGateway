# superGateway 基于esp32-c6模组的超级网关

[English](READMEEN.md) | 中文

## 产品说明
> [!NOTE]
> 本网关融合了zigbee，wifi，bluetooth，wire ethernet，4g，Lora等多种丰富的通讯接口。
> 本网关可采集RS485总线，CAN总线的相关数据

本文文档位于 [这里](https://medium.com/@yongxiangliu/a-super-gateway-with-wired-ethernet-4g-lora-zigbee-rs485-can-bus-wifi-bluetooth-and-zigbee-c2f3361c1a2d)

## 文档导航（Doc）
- VSCode + PlatformIO 安装（中文）：[`doc/如何安装 VScode+Platformio.md`](doc/%E5%A6%82%E4%BD%95%E5%AE%89%E8%A3%85%20VScode+Platformio.md)
- VSCode + PlatformIO 安装（English）：[`doc/How to install VScode+Platformio.md`](doc/How%20to%20install%20VScode+Platformio.md)
- Windows 安装 Arduino IDE（中文）：[`doc/如何在 Windows 上安装 Arduino IDE.md`](doc/%E5%A6%82%E4%BD%95%E5%9C%A8%20Windows%20%E4%B8%8A%E5%AE%89%E8%A3%85%20Arduino%20IDE.md)
- Install Arduino IDE on Windows (English)：[`doc/How to Install Arduino IDE on Windows 10.md`](doc/How%20to%20Install%20Arduino%20IDE%20on%20Windows%2010.md)
- GitHub Desktop 使用教程（中文）：[`doc/如何使用github桌面程序.md`](doc/%E5%A6%82%E4%BD%95%E4%BD%BF%E7%94%A8github%E6%A1%8C%E9%9D%A2%E7%A8%8B%E5%BA%8F.md)
- GitHub Desktop Guide (English)：[`doc/How to Use GitHub Desktop.md`](doc/How%20to%20Use%20GitHub%20Desktop.md)

## 通过本产品可以实现很多的转换，如如下单功能转换，还可以做组合转换，可实现眼花缭乱的功能，一切尽在您的创意中，或许未来的一个爆款产品就是您设计和创造的。


```
┌──────────┐ Downstream  ┌────────────────────────────────┐ 
|PC/phone  |----─┐       |           [ ESP32C6 ]          |      UP stream
└──────────┘     |       |                                |   
                 |       |   ┌──────────┐     ┌────────┐  |    ┌────────┐
┌─────────────┐  └--->   |   |   SoftAP |     |Station |  |<-- | Router |   
| WiFI Device |------>   |   └──────────┘     └────────┘  |    └────────┘
└─────────────┘          |                                |       |
┌─────────────┐          |   ┌─────────┐    ┌────────┐    |       |
| ETH Device  |------>   |   |  ETH    |    | ETH    |    |<──────┘
└─────────────┘          |   └─────────┘    └────────┘    |
                         |                                |
┌────────────┐           |   ┌────────┐                   |
| BLE Device |------->   |   |   BLE  |     ┌───────┐     |     ┌─────────┐
└────────────┘           |   └────────┘     | USART |     |<----| 4G CAT1 |
                         |                  └───────┘     |     └─────────┘
┌─────────────┐          |   ┌────────┐                   |
|zigbee device|------->  |   |zigbee  |                   |   
└─────────────┘          |   └────────┘                   | 
                         |                                |               
┌─────────────┐          |   ┌────────┐                   |
| Lora device |------->  |   | SPI    |                   |   
└─────────────┘          |   └────────┘                   | 
┌─────────────┐          |   ┌────────┐                   |
| CAN  device |------->  |   |  CAN   |                   |   
└─────────────┘          |   └────────┘                   | 
┌─────────────┐          |   ┌────────┐                   |
|RS485 device |------->  |   | UART   |                   |   
└─────────────┘          |   └────────┘                   | 
                         |                                |           
                         └────────────────────────────────┘           
                                                                      
```                               

## Features
### 正面
![原型](image/protype.jpg)

### 背面
![从后面看](image/back.jpg)

### 电路板框架
![本电路板框架](image/framework.png)

### 电路板尺寸64mm*64mm
![电路板尺寸](image/尺寸.png)

### 本电路板适配的外壳
![外壳](image/外壳.png)

### 本项目采用的4G模组型号及对应差别
![外壳](image/4g-module.png)

