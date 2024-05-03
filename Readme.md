![Easy Spin 2 Win](https://i.ibb.co/68VJf5v/Screenshot-2024-05-03-213921.png)

## Tài liệu cho Easy Spin 2 Win Wheel bởi HideCM
### Xây dựng bằng Scalable Vector Graphics (SVG), Easy Spin 2 Win Wheel là một trò chơi vòng quay linh hoạt, có thể tùy chỉnh, phản ánh độ phân giải và kiểm soát kết quả.

Kết quả vòng quay, giải thưởng, thắng/thua, số lần quay, dữ liệu tùy chỉnh và nhiều hơn nữa có thể được kiểm soát bằng dữ liệu JSON. Bạn có thể đặt xác suất chiến thắng cho mỗi phân đoạn và tùy chỉnh giao diện của Easy Spin 2 Win Wheel để phù hợp với thương hiệu hoặc màu sắc của bạn - thậm chí có cơ chế chống gian lận để ngăn người chơi đặt bánh xe vào một phân đoạn được chọn.

### Tính năng

- Xác suất
- API cho tiến trình trò chơi, theo dõi và kết quả
- Có thể đặt điểm đến quay để đảm bảo kết quả cụ thể
- Cơ chế chống gian lận
- Hỗ trợ quay ngẫu nhiên vô hạn
- Vật lý quay/ném mượt mà và trực quan
- Màu sắc có thể tùy chỉnh với mẫu duy nhất hoặc xen kẽ
- Kích thước, vị trí và kiểu dáng của đồ họa có thể tùy chỉnh
- Đáp ứng và có thể co dãn
- Số lượng phân đoạn có thể tùy chỉnh
- Sử dụng văn bản hoặc hình ảnh (hoặc cả hai!) làm giải thưởng trên mỗi phân đoạn
- Hỗ trợ GIF động làm giải thưởng của phân đoạn
- Đầu vào cảm ứng và chuột
- Hỗ trợ trên máy tính để bàn và di động
- Đồ họa SVG phụ thuộc vào độ phân giải nên Easy Spin 2 Win Wheel trông đẹp trên các màn hình có mật độ cao
- Hỗ trợ âm thanh tiếng kích bật/tắt khi quay
- Hỗ trợ bóng đổ để tạo chiều sâu
- Cửa sổ thông tin có thể được tạo kiểu thông qua CSS
- Hỗ trợ biểu tượng cảm xúc (emojis)
- Hướng quay

# API

### Sự kiện

`Easy Spin 2 WinWheel.onResult()` - Trả về Đối tượng. Điều này có thể được thiết lập trên thể hiện hoặc truyền trong đối tượng init. Trả về các thông tin sau:

- `target` - Easy Spin 2 WinWheel - thể hiện của bánh xe
- `spinCount` - Số nguyên - số lần quay hiện tại cho kết quả đó
- `msg` - Chuỗi - văn bản kết quả (đây là `resultText` trong JSON)
- `type` - Chuỗi - sẽ trả về _'result'_
- `win` - Boolean - sẽ trả về true hoặc false (dựa trên `resultText` trong JSON)
- `gameId` - Chuỗi - ID của trò chơi (được đặt trong JSON)
- `userData` - Đối tượng - một đối tượng tùy chọn có thể chứa dữ liệu cụ thể của bạn cho mỗi phân đoạn (được đặt trong JSON)

`Easy Spin 2 WinWheel.onError()` - Trả về Đối tượng. Điều này có thể được thiết lập trên thể hiện hoặc truyền trong đối tượng init. Trả về các thông tin sau:

- `target` - Easy Spin 2 WinWheel - thể hiện của bánh xe
- `spinCount` - Số nguyên - số lần quay hiện tại cho lỗi đó. Hãy nhớ rằng đây là dựa trên số 0.
- `msg` - Chuỗi - văn bản lỗi (đây là `invalidSpinText` trong JSON)
- `type` - Chuỗi - sẽ trả về _'error'_
- `win` - Chuỗi - sẽ trả về _'null'_
- `gameId` - Chuỗi - ID của trò chơi (được đặt trong JSON)

`Easy Spin 2 WinWheel.onGameEnd()` - Trả về Đối tượng chứa mục tiêu (thể hiện của Easy Spin 2 WinWheel), `gameId` và một mảng các đối tượng kết quả (đối tượng sẽ là đối tượng kết quả hoặc lỗi như trên). Điều này có thể được thiết lập trên thể hiện hoặc truyền trong đối tượng init. Trả về các thông tin sau:

- `target` - Easy Spin 2 WinWheel - thể hiện của bánh xe
- `results` - Đ

ối tượng - một mảng các đối tượng kết quả.
- `gameId` - Chuỗi - ID của trò chơi (được đặt trong JSON)

### Hàm tĩnh

`Easy Spin 2 WinWheel.reset()` - Hàm tĩnh - thiết lập lại bánh xe.

### Gọi

`Easy Spin 2 WinWheel.init(vars: Đối tượng)` - Hàm - khởi tạo thể hiện của bánh xe. Xem ví dụ dưới đây về cách sử dụng. Chấp nhận các thông tin sau:

- `onResult` - truyền vào hàm Kết quả của riêng bạn. Được gọi sau mỗi lần quay.
- `onGameEnd` - truyền vào hàm Kết thúc trò chơi của riêng bạn. Được gọi khi kết thúc trò chơi (trừ khi không có giới hạn số lần quay).
- `onError` - truyền vào hàm Lỗi của riêng bạn.
- `spinTrigger` - truyền vào nút HTML hoặc yếu tố kích hoạt quay của riêng bạn để kích hoạt quay. Biến `clickToSpin` phải là true trong JSON.

`Easy Spin 2 WinWheel.restart()` - Hàm - gọi điều này để đặt lại bánh xe dựa trên dữ liệu JSON hiện tại

`Easy Spin 2 WinWheel.getGameProgress()` - Trả về mảng các đối tượng kết quả - gọi điều này để xem các kết quả của trò chơi hiện tại trong quá trình chơi.

# Thuộc tính JSON

### Một ví dụ về tệp JSON có thể được tìm thấy [tại đây](https://s3-us-west-2.amazonaws.com/s.cdpn.io/35984/demo_wheel_data.json)

`colorArray` - Các màu được sử dụng cho mỗi phân đoạn. Bạn có thể đặt bao nhiêu màu tùy ý. Nếu có ít màu hơn so với các mục trong `segmentValuesArray` thì màu sẽ xen kẽ. Đây là một tính năng hữu ích nếu bạn muốn thiết kế bánh xe với bảng màu của thương hiệu của mình. Ví dụ, nếu thương hiệu của bạn có màu đỏ, vàng và cam thì chỉ cần bao gồm những màu đó và Easy Spin 2 Win Wheel sẽ xen kẽ chúng bất kể có bao nhiêu phân đoạn. Để xen kẽ giữa hai màu chỉ cần bao gồm hai màu.

`segmentValuesArray` - một mảng các đối tượng chứa các thông tin sau:

- `type` - Chuỗi - loại giá trị trên phân đoạn - có thể là 'hình ảnh' hoặc 'chuỗi'. Bạn có linh hoạt để sử dụng văn bản hoặc hình ảnh (SVG, PNG, JPG, GIF) - bạn có thể thậm chí sử dụng một GIF động. Kích thước của nó được xác định bởi `wheelImageSize`. Nếu hình ảnh bạn sử dụng không phải là hình vuông và `wheelImageSize` là, ví dụ, 54, hình ảnh sẽ được thu nhỏ giữ nguyên tỷ lệ của nó thành chiều rộng là 54px. SVG 1.1 không hỗ trợ tự động gói từng dòng, vì vậy bạn có thể thêm dấu ^ nơi bạn muốn một dòng mới. Ví dụ: You won^a holiday! 
- `value` - Chuỗi - có thể là URL hình ảnh (hình ảnh SVG được khuyến nghị cho tính độc lập với độ phân giải) hoặc một giá trị như '$450' hoặc 'Holiday'.
- `win` - Boolean - mô tả xem phân đoạn này có phải là người chiến thắng hay không. Hữu ích cho cả hiển thị phía trước và cơ sở dữ liệu phía sau.
- `resultText` - Chuỗi - văn bản được hiển thị khi bánh xe đậu ở phân đoạn đó.
- `probability`<a name="probability"></a> - Số - bất kỳ số nguyên nào. Ví dụ: ```"probability"=20```. Tất cả các giá trị xác suất sẽ được cộng lại. Giá trị riêng của chúng sẽ là một phần trăm của tổng giá trị đó. Tương tự ```"probability"=0``` có nghĩa là bánh xe sẽ không bao giờ đậu ở phân đoạn này. Khác với các phiên bản trước đó, *những giá trị này không cần phải cộng lại thành 100*.

*Ghi chú về xác suất:* Nếu bạn muốn mỗi phân đoạn có xác suất chiến thắng bằng nhau thì hãy xóa các thuộc tính xác suất từ mỗi phân đoạn vì xác suất bằng nhau là ngẫu nhiên. Ngoài ra, bạn chỉ có thể sử dụng xác suất khi [```clickToSpin```](#clickToSpin) là true - nó không được áp dụng khi ném bánh xe với một cử chỉ.

Lưu ý rằng bất kỳ giá trị nào được đặt trong ```spinDestinationArray``` sẽ bị bỏ qua

 nếu bạn đang sử dụng xác suất. Để đặt số lần quay, hãy sử dụng [```numSpins```](#numSpins) (một số nguyên cho số lần quay hoặc -1 cho số lần quay vô hạn).

- `userData` - Đối tượng - một đối tượng tùy chọn có thể chứa dữ liệu tùy chỉnh của bạn cho mỗi phân đoạn trong sự kiện ```onResult```

`svgWidth` - Số nguyên (px) - Chiều rộng viewBox của SVG

`svgHeight` - Số nguyên (px) - Chiều cao viewBox của SVG

`wheelStrokeColor` - Chuỗi - giá trị HEX, RGB hoặc RGBA cho màu đường viền chính của bánh xe

`wheelStrokeWidth` - Số nguyên (px) - độ dày của đường viền bánh xe

`wheelSize` - Số nguyên (px) cho đường kính của bánh xe

`wheelTextOffsetY` - Số nguyên (px) - khoảng cách văn bản phân đoạn phải

`wheelTextSize`  - Giá trị (em, px, số nguyên) cho kích thước phông chữ (nếu bạn đang sử dụng văn bản cho nhãn phân đoạn)

`wheelImageOffsetY` - Số nguyên (px) - khoảng cách hình ảnh phân đoạn phải

`wheelImageSize` - Số nguyên (px) - chiều rộng của hình ảnh phân đoạn. Hình ảnh sẽ bị ràng buộc bởi tỷ lệ khung hình của nó

`centerCircleSize` - Số nguyên (px) - đường kính của hình tròn trung tâm

`centerCircleStrokeColor` - Số nguyên (px) - màu viền của hình tròn trung tâm

`centerCircleStrokeWidth` - Số nguyên (px) - độ dày viền của hình tròn trung tâm

`centerCircleFillColor` - Số nguyên (px) - màu nền của hình tròn trung tâm

`segmentStrokeColor` - Chuỗi - giá trị HEX, RGB hoặc RGBA cho viền của phân đoạn

`segmentStrokeWidth` - Số nguyên (px) - độ dày của viền phân đoạn

`centerX` - Số nguyên (px) - thường là một nửa giá trị `svgWidth`

`centerY` - Số nguyên (px) - thường là một nửa giá trị `svgHeight`

`hasShadows` - Boolean - áp dụng bóng cho bánh xe chính và ngoài cùng và cả giá trị phân đoạn (văn bản hoặc hình ảnh). Việc sử dụng bóng có thể làm giảm hiệu suất trên một số thiết bị di động nên cần thử nghiệm trước.

`numSpins` <a name="numSpins"></a> - Số nguyên - có thể là bất kỳ số lần quay ngẫu nhiên nào - sử dụng -1 cho số lần quay vô hạn. Giá trị này sẽ bị bỏ qua nếu `spinDestinationArray` chứa các giá trị. Tuy nhiên, nếu bạn đang sử dụng ```probability``` thì ```numSpins``` được sử dụng và ```spinDestinationArray``` sẽ bị bỏ qua. 

`spinDestinationArray` - Mảng - đặt phân đoạn nào mà mỗi lần quay sẽ đến. Số lượng mục sẽ là số lần quay cho phép. Nếu điều này không được xác định thì `numSpins` sẽ được sử dụng làm số lần quay cho phép.

 Chú ý: Bạn cũng có thể sử dụng cơ chế xác suất trong khi sử dụng `spinDestinationArray` (tham khảo ví dụ [tại đây](https://s3-us-west-2.amazonaws.com/s.cdpn.io/35984/demo_wheel_data_probability.json))

`spinDirection` - Chuỗi - chỉ định hướng quay của bánh xe. Giá trị hợp lệ là 'clockwise' hoặc 'anticlockwise'. Mặc định là 'clockwise'

`clickToSpin` <a name="clickToSpin"></a> - Boolean - Đặt true nếu bạn muốn yếu tố kích hoạt nút để quay. Mặc định là false. Nếu bạn đang sử dụng `probability` thì chỉ cần thiết lập ```clickToSpin``` là ```true``` nếu bạn muốn sử dụng cơ chế xác suất.

`textFontFamily` - Chuỗi - tên phông chữ. Ví dụ: ```"Arial"```, ```"Georgia"```, ```"Verdana"```, ```"Trebuchet MS"```. *Không sử dụng dấu ngoặc kép*.

`animation` - Số nguyên (giây) - thời gian mỗi lần quay

`callbackFinished` - Hàm - sử dụng nếu bạn muốn gọi một hàm sau khi bánh xe kết thúc

`preventDoubleClick` - Boolean - có ngăn chặn đánh đôi nút quay hay không

`limitsSpins` - Số nguyên - ngăn chặn việc quay theo một số lần quay cụ thể

`pointerAngle` - Số nguyên - sử dụng nếu bạn muốn xoay bánh xe theo góc xác định. Ví dụ: ```-45``` sẽ xoay bánh xe 45 độ nút quay.

`rotationAngle` - Số nguyên - sử dụng nếu bạn muốn quay bánh xe một số độ xác định mỗi lần quay. Ví dụ: ```22.5``` sẽ quay bánh xe 22.5 độ mỗi lần quay.

`pointerGuideDisplay` - Boolean - sử dụng nếu bạn muốn hiển thị dấu mũi tên chỉ hướng xoay của bánh xe.

`textFontSize` - Số nguyên - kích thước phông chữ dành cho nhãn phân đoạn.

`wheelImageHeight` - Số nguyên - chiều cao của hình ảnh phân đoạn. Nếu giá trị này được thiết lập, nó sẽ ghi đè lên ```wheelImageSize```.

`animationStop` - Boolean - dừng quay nếu người chơi nhấn vào nút quay trong khi nó đang quay

`pointerGuideColor` - Chuỗi - màu của dấu mũi tên chỉ hướng xoay

`animationTime` - Số nguyên - thời gian quay mỗi lần

`pointerGuideSize` - Số nguyên - kích thước của dấu mũi tên chỉ hướng xoay

`disabledOpacity` - Số nguyên - độ mờ khi phân đoạn không có giá trị

`disabledTextOpacity` - Số nguyên - độ mờ khi phân đoạn không có giá trị cho văn bản

`pointerGuideType` - Chuỗi - loại dấu mũi tên chỉ hướng xoay, có thể là ```"line"``` hoặc ```"triangle"```

`stopOnWin` - Boolean - ngừng quay khi đạt được phần thưởng

`cursor` - Chuỗi - loại con trỏ khi di chuyển qua bánh xe

### Ví dụ

```json
{
  "colorArray":["#E74C3C","#F1C40F","#3498DB","#2ECC71"],
  "segmentValuesArray":[
    {"type":"text","value":"100","win":false,"resultText":"You won 100 points","probability":25},
    {"type":"text","value":"200","win":false,"resultText":"You won 200 points","probability":25},
    {"type":"text","value":"300","win":false,"resultText":"You won 300 points","probability":25},
    {"type":"text","value":"400","win":true,"resultText":"You won 400 points","probability":25}
  ],
  "svgWidth":700,
  "svgHeight":700,
  "wheelStrokeColor":"#D0BD0C",
  "wheelStrokeWidth":18,
  "wheelSize":600,
  "wheelTextOffsetY":80,
  "wheelImageOffsetY":40,
  "wheelImageSize":80,
  "centerCircleSize":360,
  "centerCircleStrokeColor":"#0C090A",
  "centerCircleStrokeWidth":0,
  "centerCircleFillColor":"#0C090A",
  "segmentStrokeColor":"#FFFFFF",
  "segmentStrokeWidth":2,
  "centerX":350,
  "centerY":350,
  "numSpins":5,
  "spinDirection":"clockwise",
  "clickToSpin":true,
  "textFontFamily":"Arial",
  "animation":3,
  "callbackFinished":"alertPrize()",
  "preventDoubleClick":true,
  "limitsSpins":5,
  "pointerAngle":20,
  "rotationAngle":10,
  "pointerGuideDisplay":true,
  "textFontSize":20,
  "wheelImageHeight":40,
  "animationStop":true,
  "pointerGuideColor":"#2ECC71",
  "animationTime":2,
  "pointerGuideSize":15,
  "disabledOpacity":0.25,
  "disabledTextOpacity":0.4,
  "pointerGuideType":"line",
  "stopOnWin":true,
  "cursor":"pointer"
}
```

### Giải pháp tích hợp

- Cấu hình tệp JSON theo nhu cầu của bạn.
- Tạo một đối tượng JavaScript hoặc gọi API từ máy chủ của bạn để lấy dữ liệu

 JSON.
- Sử dụng `Easy Spin 2 WinWheel.init(vars: Object)` để khởi tạo bánh xe.
- Đối với các tùy chọn kèm theo, thêm các hàm cần thiết trong `onResult`, `onGameEnd`, và `onError`. Bạn cũng có thể sử dụng `callbackFinished` nếu bạn muốn gọi một hàm cụ thể sau khi kết thúc quay bánh xe. 
- Thêm các sự kiện kích hoạt (ví dụ: nhấp vào nút) để gọi `Easy Spin 2 WinWheel.spin()`. Nếu `clickToSpin` được đặt thành `true`, bạn cũng có thể thêm bất kỳ sự kiện kích hoạt nào mà bạn muốn. 

Nếu bạn đang tích hợp cố định (ví dụ: không có môi trường máy chủ), bạn có thể sao chép mã HTML và JavaScript từ [đây](https://codepen.io/piker3/pen/ZEQXXzV). Chú ý rằng cần phải thay thế tệp JSON với tệp của riêng bạn và đảm bảo rằng bạn có tất cả các phân đoạn và thiết lập cần thiết.
