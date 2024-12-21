/*
  This Sketch demonstrates how to use the Hardware Serial peripheral to communicate over an RS485 bus.

  Data received on the primary serial port is relayed to the bus acting as an RS485 interface and vice versa.

  UART to RS485 translation hardware (e.g., MAX485, MAX33046E, ADM483) is assumed to be configured in half-duplex
  mode with collision detection as described in
  https://docs.espressif.com/projects/esp-idf/en/latest/esp32/api-reference/peripherals/uart.html#circuit-a-collision-detection-circuit

  To use the script open the Arduino serial monitor (or alternative serial monitor on the Arduino port). Then,
  using an RS485 tranciver, connect another serial monitor to the RS485 port. Entering data on one terminal
  should be displayed on the other terminal.
*/
#include "hal/uart_types.h"

#define RS485_RX_PIN  5
#define RS485_TX_PIN  6

#define RS485 Serial1

void setup() {
  Serial.begin(9600);

  RS485.begin(9600, SERIAL_8N1, RS485_RX_PIN, RS485_TX_PIN);
  while (!RS485) {
    delay(10);
  }
 
}

void loop() {
  if (RS485.available()) {
    Serial.print(RS485.read(),HEX);
  }
  if (Serial.available()) {
    RS485.print(Serial.read(),HEX);
  }
}
