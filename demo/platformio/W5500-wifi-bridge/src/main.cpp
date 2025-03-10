#include <WiFi.h>
#include <ETH.h>
#include <SPI.h>

#define ETH_TYPE     ETH_PHY_W5500
#define ETH_ADDR     1

#define ETH_CS       7
#define ETH_IRQ      10
#define ETH_RST      11
#define ETH_SPI_SCK  0
#define ETH_SPI_MISO 1
#define ETH_SPI_MOSI 8

// WiFi credentials
#define WIFI_SSID "SYDD"            // 替换为你要连接的WiFi名称
#define WIFI_PASS "DDQC@sydd@123"   // 替换为WiFi密码

// Ethernet configuration
IPAddress eth_ip(192, 168, 1, 1);
IPAddress eth_mask(255, 255, 255, 0);
IPAddress eth_gateway(192, 168, 1, 1);
IPAddress eth_dns(8, 8, 8, 8);      // Google DNS

bool wifi_connected = false;
IPAddress wifi_ip;

void onEvent(arduino_event_id_t event, arduino_event_info_t info);

void setup() {
  Serial.begin(115200);
  Serial.setDebugOutput(true);
  Network.onEvent(onEvent);

  // 初始化SPI和以太网
  SPI.begin(ETH_SPI_SCK, ETH_SPI_MISO, ETH_SPI_MOSI);
  ETH.begin(ETH_TYPE, ETH_ADDR, ETH_CS, ETH_IRQ, ETH_RST, SPI);
  
  // 连接WiFi
  WiFi.begin(WIFI_SSID, WIFI_PASS);
  Serial.println("Connecting to WiFi...");
}

void loop() {
  delay(1000);
  if (wifi_connected && ETH.linkUp()) {
    // 确保以太网配置正确
    ETH.config(eth_ip, wifi_ip, eth_mask, eth_dns);
  }
}

void onEvent(arduino_event_id_t event, arduino_event_info_t info) {
  switch (event) {
    case ARDUINO_EVENT_ETH_START:     
      Serial.println("ETH Started"); 
      break;
      
    case ARDUINO_EVENT_ETH_CONNECTED: 
      Serial.println("ETH Connected"); 
      if (wifi_connected) {
        ETH.config(eth_ip, wifi_ip, eth_mask, eth_dns);
      }
      break;
      
    case ARDUINO_EVENT_ETH_GOT_IP:
      Serial.println("ETH Got IP");
      Serial.println(ETH);
      break;
      
    case ARDUINO_EVENT_ETH_LOST_IP:
      Serial.println("ETH Lost IP");
      break;
      
    case ARDUINO_EVENT_ETH_DISCONNECTED:
      Serial.println("ETH Disconnected");
      break;
      
    case ARDUINO_EVENT_ETH_STOP: 
      Serial.println("ETH Stopped"); 
      break;

    case ARDUINO_EVENT_WIFI_STA_START:
      Serial.println("WiFi STA Started");
      break;
      
    case ARDUINO_EVENT_WIFI_STA_CONNECTED:
      Serial.println("WiFi STA Connected");
      break;
      
    case ARDUINO_EVENT_WIFI_STA_DISCONNECTED:
      Serial.println("WiFi STA Disconnected");
      wifi_connected = false;
      break;
      
    case ARDUINO_EVENT_WIFI_STA_GOT_IP:
      Serial.println("WiFi STA Got IP");
      wifi_ip = WiFi.localIP();
      Serial.println(wifi_ip);
      wifi_connected = true;
      if (ETH.linkUp()) {
        ETH.config(eth_ip, wifi_ip, eth_mask, eth_dns);
      }
      break;
      
    case ARDUINO_EVENT_WIFI_STA_LOST_IP:
      Serial.println("WiFi STA Lost IP");
      wifi_connected = false;
      break;

    default: break;
  }
}
