# superGateway: A Super Gateway Based on ESP32-C6 Module

English | [中文](README.md)

## Product Description
> [!NOTE]
> This gateway integrates multiple communication interfaces, including Zigbee, Wi-Fi, Bluetooth, wired Ethernet, 4G, and LoRa.
> It can also collect data from RS485 bus and CAN bus.

This document is available [here](https://medium.com/@yongxiangliu/a-super-gateway-with-wired-ethernet-4g-lora-zigbee-rs485-can-bus-wifi-bluetooth-and-zigbee-c2f3361c1a2d)

## Documentation Navigation
- VSCode + PlatformIO Setup (English): [`doc/How to install VScode+Platformio.md`](doc/How%20to%20install%20VScode+Platformio.md)
- VSCode + PlatformIO Setup (中文): [`doc/如何安装 VScode+Platformio.md`](doc/%E5%A6%82%E4%BD%95%E5%AE%89%E8%A3%85%20VScode+Platformio.md)
- Install Arduino IDE on Windows (English): [`doc/How to Install Arduino IDE on Windows 10.md`](doc/How%20to%20Install%20Arduino%20IDE%20on%20Windows%2010.md)
- Windows 安装 Arduino IDE (中文): [`doc/如何在 Windows 上安装 Arduino IDE.md`](doc/%E5%A6%82%E4%BD%95%E5%9C%A8%20Windows%20%E4%B8%8A%E5%AE%89%E8%A3%85%20Arduino%20IDE.md)
- GitHub Desktop Guide (English): [`doc/How to Use GitHub Desktop.md`](doc/How%20to%20Use%20GitHub%20Desktop.md)
- GitHub Desktop 使用教程 (中文): [`doc/如何使用github桌面程序.md`](doc/%E5%A6%82%E4%BD%95%E4%BD%BF%E7%94%A8github%E6%A1%8C%E9%9D%A2%E7%A8%8B%E5%BA%8F.md)

## This product enables many protocol conversions, including single-function conversions and combined conversions. It supports a wide range of possibilities, all driven by your creativity. Your next hit product might come from what you design and build here.

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
### Front
![Prototype](image/protype.jpg)

### Back
![Back view](image/back.jpg)

### PCB Framework
![PCB framework](image/framework.png)

### PCB Size 64mm * 64mm
![PCB size](image/尺寸.png)

### Enclosure Compatible with This PCB
![Enclosure](image/外壳.png)

### 4G Module Models Used in This Project and Their Differences
![4G module](image/4g-module.png)

