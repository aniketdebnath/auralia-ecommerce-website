import { DollarSign, Headset, ShoppingBag, WalletCards } from "lucide-react";
import { Card, CardContent } from "./ui/card";

const IconBoxes = () => {
  return (
    <div>
      <Card>
        <CardContent className="grid md:grid-cols-4 gap-4 p-4">
          <div className="space-y-2">
            <ShoppingBag />
            <div className="text-sm font-bold">Free Shipping</div>
            <div className="text-sm text-muted-foreground">
              Free Shipping on Orders Above $100
            </div>
          </div>
          <div className="space-y-2">
            <DollarSign />
            <div className="text-sm font-bold">Guranteed Money Back</div>
            <div className="text-sm text-muted-foreground">
              Within 14 Days of Purchase
            </div>
          </div>
          <div className="space-y-2">
            <WalletCards />
            <div className="text-sm font-bold">
              Wide Range of Payment Options
            </div>
            <div className="text-sm text-muted-foreground">
              Pay with Credit Card, Paypal, Klarna ,Zip, Cash on Delivery and
              more
            </div>
          </div>
          <div className="space-y-2">
            <Headset />
            <div className="text-sm font-bold">24/7 Support</div>
            <div className="text-sm text-muted-foreground">
              Contact Us Anytime
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
export default IconBoxes;
